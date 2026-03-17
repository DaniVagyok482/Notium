        import { auth, db } from "./firebase-config.js";
        import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
        import { collection, addDoc, query, where, orderBy, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp }
            from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

        let currentNoteId = null;
        const editor = document.getElementById('editor');
        const titleInput = document.getElementById('noteTitle');

        window.format = (cmd, val) => document.execCommand(cmd, false, val);

        onAuthStateChanged(auth, (user) => {
            if (!user) window.location.href = "index.html";
            else loadNotes(user.uid);
        });

        document.getElementById('logoutBtn').onclick = () => signOut(auth);

        document.getElementById('newBtn').onclick = () => {
            currentNoteId = null;
            titleInput.value = "";
            editor.innerHTML = "";
            titleInput.focus();
        };

        // TÖRLÉS
        window.deleteNote = async (e, id) => {
            e.stopPropagation();
            if (confirm("Biztosan törölni szeretnéd ezt a jegyzetet?")) {
                try {
                    await deleteDoc(doc(db, "notes", id));
                    if (currentNoteId === id) {
                        currentNoteId = null;
                        titleInput.value = "";
                        editor.innerHTML = "";
                    }
                } catch (err) {
                    alert("Hiba a törlés során: " + err.message);
                }
            }
        };

        document.getElementById('saveBtn').onclick = async () => {
            const content = editor.innerHTML;
            const title = titleInput.value.trim() || "Névtelen jegyzet";
            if (!content.trim() || content === "<br>") return;

            try {
                if (currentNoteId) {
                    await updateDoc(doc(db, "notes", currentNoteId), {
                        title: title, text: content, updatedAt: serverTimestamp()
                    });
                } else {
                    await addDoc(collection(db, "notes"), {
                        title: title, text: content, userId: auth.currentUser.uid, createdAt: serverTimestamp()
                    });
                    currentNoteId = null; titleInput.value = ""; editor.innerHTML = "";
                }
                alert("Elmentve!");
            } catch (e) { alert("Hiba: " + e.message); }
        };

        function loadNotes(uid) {
            const q = query(collection(db, "notes"), where("userId", "==", uid), orderBy("createdAt", "desc"));
            onSnapshot(q, (snapshot) => {
                const list = document.getElementById('notesList');
                list.innerHTML = "";
                snapshot.forEach((d) => {
                    const data = d.data();
                    const div = document.createElement('div');
                    div.className = 'note-item';
                    const plainText = data.text.replace(/<[^>]*>/g, '').substring(0, 30);

                    div.innerHTML = `
                    <button class="delete-btn" onclick="deleteNote(event, '${d.id}')">🗑</button>
                    <b>${data.title || 'Névtelen'}</b>
                    <span>${plainText}...</span>
                `;

                    div.onclick = () => {
                        currentNoteId = d.id;
                        titleInput.value = data.title || "";
                        editor.innerHTML = data.text;
                    };
                    list.appendChild(div);
                });
            });
        }

        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = "index.html";
            } else {
                document.getElementById('userEmailDisplay').innerText = user.email;

                loadNotes(user.uid);
            }
        });