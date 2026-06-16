import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, getDoc, collection, getDocs, deleteDoc, writeBatch, onSnapshot } from "firebase/firestore";
import { uploadToCloudinary } from "../cloudinary";
import { DEFAULT_SONGS } from "./Release";
import SEOHead from "./SEOHead";
import "../CSS/Admin.css";

function AdminPanel() {
    const { isAdmin, user, loginWithGoogle, logout, loading } = useAuth();
    const [activeTab, setActiveTab] = useState("home");

    if (loading) {
        return (
            <div className="admin-page" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <p style={{ color: "#fff" }}>Đang kiểm tra quyền truy cập...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="admin-page" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <div className="admin-wrapper" style={{ textAlign: "center", padding: "40px" }}>
                    <h2 style={{ color: "#fff", marginBottom: "20px" }}>🔒 Admin Access</h2>
                    <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "30px" }}>Vui lòng đăng nhập để tiếp tục quản trị.</p>
                    <button onClick={loginWithGoogle} className="admin-submit" style={{ padding: "12px 24px", fontSize: "16px", cursor: "pointer" }}>
                        🔑 Đăng nhập với Google
                    </button>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="admin-page" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <div className="admin-wrapper" style={{ textAlign: "center", padding: "40px" }}>
                    <h2 style={{ color: "#ff4d4d", marginBottom: "20px" }}>🚫 Từ chối truy cập</h2>
                    <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "30px" }}>Tài khoản ({user.email}) không có quyền quản trị.</p>
                    <button onClick={logout} className="admin-submit" style={{ padding: "12px 24px", fontSize: "16px", backgroundColor: "#d93838", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                        🚪 Đăng xuất
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEOHead title="Admin Panel – Lussixuss" description="Admin panel" path="/admin" />
            <div className="admin-page">
                <div className="admin-wrapper">
                    <h1 className="admin-title">🎵 Admin Panel</h1>

                    {/* Tab Switcher */}
                    <div className="admin-tabs">
                        <button
                            className={`admin-tab ${activeTab === "home" ? "active" : ""}`}
                            onClick={() => setActiveTab("home")}
                        >
                            Home
                        </button>
                        <button
                            className={`admin-tab ${activeTab === "release" ? "active" : ""}`}
                            onClick={() => setActiveTab("release")}
                        >
                            Release
                        </button>
                        <button
                            className={`admin-tab ${activeTab === "background" ? "active" : ""}`}
                            onClick={() => setActiveTab("background")}
                        >
                            Background
                        </button>
                    </div>

                    {activeTab === "home" && <HomeTab user={user} />}
                    {activeTab === "release" && <ReleaseTab user={user} />}
                    {activeTab === "background" && <BackgroundTab user={user} />}
                </div>
            </div>
        </>
    );
}

/* ==================== HOME TAB ==================== */
function HomeTab({ user }) {
    const [title, setTitle] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [audioFile, setAudioFile] = useState(null); // Added audio state
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [currentSong, setCurrentSong] = useState(null);
    const [spotify, setSpotify] = useState("");
    const [appleMusic, setAppleMusic] = useState("");
    const [youtubeMusic, setYoutubeMusic] = useState("");
    const [soundcloud, setSoundcloud] = useState("");

    useEffect(() => {
        const loadCurrentSong = async () => {
            try {
                const docSnap = await getDoc(doc(db, "settings", "homeSong"));
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setCurrentSong(data);
                    setTitle(data.title || "");
                    setSpotify(data.spotify || "");
                    setAppleMusic(data.appleMusic || "");
                    setYoutubeMusic(data.youtubeMusic || "");
                    setSoundcloud(data.soundcloud || "");
                }
            } catch (error) {
                console.error("Error loading song:", error);
            }
        };
        loadCurrentSong();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAudioFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) { setMessage("⚠️ Vui lòng nhập tên bài hát"); return; }
        setUploading(true);
        setMessage("");
        try {
            let imageUrl = currentSong?.imageUrl || "";
            if (imageFile) {
                imageUrl = await uploadToCloudinary(imageFile, "lussixuss/home");
            }

            let audioUrl = currentSong?.audioUrl || "";
            if (audioFile) {
                audioUrl = await uploadToCloudinary(audioFile, "lussixuss/homeAudio");
            }

            const songData = {
                title: title.trim(), 
                imageUrl, 
                audioUrl, // Save Cloudinary audio URL
                spotify: spotify.trim(), appleMusic: appleMusic.trim(),
                youtubeMusic: youtubeMusic.trim(), soundcloud: soundcloud.trim(),
                updatedAt: new Date().toISOString(), updatedBy: user.email,
            };
            await setDoc(doc(db, "settings", "homeSong"), songData);
            setMessage("✅ Cập nhật thành công!");
            setCurrentSong(songData);
            setImageFile(null);
            setAudioFile(null);
        } catch (error) {
            setMessage("❌ Lỗi: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="admin-section">
            <p className="admin-subtitle">Quản lý nội dung trang Home</p>
            {currentSong?.imageUrl && (
                <div className="admin-current">
                    <h3>Đang hiển thị:</h3>
                    <div className="admin-current-preview">
                        <img src={currentSong.imageUrl} alt={currentSong.title} />
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
                            <span>{currentSong.title}</span>
                            {currentSong.audioUrl && (
                                <audio src={currentSong.audioUrl} controls style={{ height: "30px", width: "100%", maxWidth: "300px" }} />
                            )}
                        </div>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-field">
                    <label>Tên bài hát</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="VD: Night" />
                </div>
                <div className="admin-field">
                    <label>Ảnh bìa</label>
                    <div className="admin-file-input">
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <span className="admin-file-label">{imageFile ? imageFile.name : "Chọn ảnh..."}</span>
                    </div>
                    {imagePreview && <div className="admin-image-preview"><img src={imagePreview} alt="Preview" /></div>}
                </div>
                <div className="admin-field">
                    <label>File âm thanh</label>
                    <div className="admin-file-input">
                        <input type="file" accept="audio/*" onChange={handleAudioChange} />
                        <span className="admin-file-label">{audioFile ? audioFile.name : "Chọn file nhạc..."}</span>
                    </div>
                </div>
                <div className="admin-field">
                    <label>Spotify Link</label>
                    <input type="url" value={spotify} onChange={(e) => setSpotify(e.target.value)} placeholder="https://open.spotify.com/..." />
                </div>
                <div className="admin-field">
                    <label>Apple Music Link</label>
                    <input type="url" value={appleMusic} onChange={(e) => setAppleMusic(e.target.value)} placeholder="https://music.apple.com/..." />
                </div>
                <div className="admin-field">
                    <label>YouTube Music Link</label>
                    <input type="url" value={youtubeMusic} onChange={(e) => setYoutubeMusic(e.target.value)} placeholder="https://music.youtube.com/..." />
                </div>
                <div className="admin-field">
                    <label>SoundCloud Link</label>
                    <input type="url" value={soundcloud} onChange={(e) => setSoundcloud(e.target.value)} placeholder="https://soundcloud.com/..." />
                </div>
                <button type="submit" className="admin-submit" disabled={uploading}>
                    {uploading ? "Đang tải lên..." : "💾 Lưu & Cập nhật"}
                </button>
                {message && <p className="admin-message">{message}</p>}
            </form>
        </div>
    );
}

/* ==================== RELEASE TAB ==================== */

function OrderInput({ initialValue, onReorder }) {
    const [val, setVal] = useState(initialValue);

    useEffect(() => {
        setVal(initialValue);
    }, [initialValue]);

    const handleBlur = () => {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num !== initialValue) {
            onReorder(num - 1);
        } else {
            setVal(initialValue); // Reset nếu nhập sai hoặc để trống
        }
    };

    return (
        <input 
            type="text"
            className="order-input"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
                if (e.key === 'Enter') e.target.blur();
            }}
        />
    );
}

function ReleaseTab({ user }) {
    const [releases, setReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // New release form
    const [newTitle, setNewTitle] = useState("");
    const [newLink, setNewLink] = useState("");
    const [newImageFile, setNewImageFile] = useState(null);
    const [newImagePreview, setNewImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Load releases from Firestore
    useEffect(() => {
        loadReleases();
    }, []);

    const loadReleases = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "releases"));
            const items = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.isLegacy) {
                    const localSong = DEFAULT_SONGS.find(s => s.id === data.localId);
                    if (localSong) {
                        items.push({ ...data, id: doc.id, imageUrl: localSong.image });
                    }
                } else {
                    items.push({ id: doc.id, ...data });
                }
            });
            items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
            setReleases(items);
        } catch (error) {
            console.error("Error loading releases:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setNewImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Add new release
    const handleAddRelease = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) { setMessage("⚠️ Nhập tên bài hát"); return; }
        if (!newImageFile && !newLink.trim()) { setMessage("⚠️ Cần ảnh hoặc link"); return; }

        setUploading(true);
        setMessage("");
        try {
            let imageUrl = "";
            if (newImageFile) {
                imageUrl = await uploadToCloudinary(newImageFile, "lussixuss/releases");
            }

            const releaseId = `release_${Date.now()}`;
            await setDoc(doc(db, "releases", releaseId), {
                title: newTitle.trim(),
                imageUrl,
                link: newLink.trim(),
                order: releases.length,
                createdAt: new Date().toISOString(),
                createdBy: user.email,
            });

            setMessage("✅ Đã thêm bản phát hành!");
            setNewTitle("");
            setNewLink("");
            setNewImageFile(null);
            setNewImagePreview(null);
            await loadReleases();
        } catch (error) {
            setMessage("❌ Lỗi: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Move release up/down
    const moveRelease = async (index, direction) => {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= releases.length) return;

        const updated = [...releases];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];

        // Update order in state
        const reordered = updated.map((item, i) => ({ ...item, order: i }));
        setReleases(reordered);

        // Save order to Firestore
        try {
            const batch = writeBatch(db);
            reordered.forEach((item) => {
                const docRef = doc(db, "releases", item.id);
                batch.update(docRef, { order: item.order });
            });
            await batch.commit();
        } catch (error) {
            console.error("Error reordering:", error);
        }
    }; // <-- Added missing closing brace

    // Direct numeric input for ordering
    const handleDirectReorder = async (oldIndex, newIndex) => {
        if (isNaN(newIndex) || newIndex === oldIndex) return;
        
        let validNewIndex = Math.max(0, Math.min(newIndex, releases.length - 1));
        if (validNewIndex === oldIndex) return;

        const updated = [...releases];
        const [movedItem] = updated.splice(oldIndex, 1);
        updated.splice(validNewIndex, 0, movedItem);

        // Update order in state
        const reordered = updated.map((item, i) => ({ ...item, order: i }));
        setReleases(reordered);

        // Save order to Firestore
        try {
            const batch = writeBatch(db);
            reordered.forEach((item) => {
                const docRef = doc(db, "releases", item.id);
                batch.update(docRef, { order: item.order });
            });
            await batch.commit();
        } catch (error) {
            console.error("Error reordering:", error);
        }
    };

    // Delete release
    const handleDelete = async (releaseId) => {
        if (!window.confirm("Xóa bản phát hành này?")) return;
        try {
            await deleteDoc(doc(db, "releases", releaseId));
            setMessage("🗑️ Đã xóa!");
            await loadReleases();
        } catch (error) {
            setMessage("❌ Lỗi: " + error.message);
        }
    };

    // Migrate old data to Firestore
    const handleMigrateOldData = async () => {
        if (!window.confirm("Đồng bộ 28 bài hát cũ lên hệ thống để sắp xếp? (Chỉ cần làm 1 lần)")) return;
        setUploading(true);
        setMessage("");
        try {
            const batch = writeBatch(db);
            DEFAULT_SONGS.forEach((song, index) => {
                const docRef = doc(db, "releases", `legacy_${song.id}`);
                batch.set(docRef, {
                    title: song.title,
                    link: song.link,
                    isLegacy: true,
                    localId: song.id,
                    order: index + releases.length,
                    createdAt: new Date().toISOString(),
                    createdBy: "system"
                });
            });
            await batch.commit();
            setMessage("✅ Đã đồng bộ thành công!");
            await loadReleases();
        } catch (error) {
            setMessage("❌ Lỗi: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="admin-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p className="admin-subtitle" style={{ margin: 0 }}>Quản lý bản phát hành</p>
                {releases.length < 28 && (
                    <button onClick={handleMigrateOldData} disabled={uploading} style={{ padding: "6px 12px", background: "rgba(255,255,255,0.1)", border: "none", color: "white", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
                        📥 Nhập dữ liệu cũ
                    </button>
                )}
            </div>

            {/* Add new release */}
            <form onSubmit={handleAddRelease} className="admin-form">
                <h3 className="admin-section-title">➕ Thêm bản phát hành mới</h3>
                <div className="admin-field">
                    <label>Tên bài hát</label>
                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="VD: Night" />
                </div>
                <div className="admin-field">
                    <label>Ảnh bìa</label>
                    <div className="admin-file-input">
                        <input type="file" accept="image/*" onChange={handleNewImageChange} />
                        <span className="admin-file-label">{newImageFile ? newImageFile.name : "Chọn ảnh..."}</span>
                    </div>
                    {newImagePreview && <div className="admin-image-preview"><img src={newImagePreview} alt="Preview" /></div>}
                </div>
                <div className="admin-field">
                    <label>Link nghe nhạc</label>
                    <input type="url" value={newLink} onChange={(e) => setNewLink(e.target.value)} placeholder="https://social.tunecore.com/..." />
                </div>
                <button type="submit" className="admin-submit" disabled={uploading}>
                    {uploading ? "Đang tải lên..." : "➕ Thêm Release"}
                </button>
                {message && <p className="admin-message">{message}</p>}
            </form>

            {/* Release list with reorder */}
            <div className="admin-release-list">
                <h3 className="admin-section-title">📋 Danh sách ({releases.length})</h3>
                {loading ? (
                    <p className="admin-loading">Đang tải...</p>
                ) : releases.length === 0 ? (
                    <p className="admin-empty">Chưa có bản phát hành nào</p>
                ) : (
                    releases.map((release, index) => (
                        <div key={release.id} className="admin-release-item">
                            <div className="admin-release-order">
                                <button
                                    className="order-btn"
                                    onClick={() => moveRelease(index, -1)}
                                    disabled={index === 0}
                                    title="Di chuyển lên"
                                >▲</button>
                                <OrderInput 
                                    initialValue={index + 1}
                                    onReorder={(newIndex) => handleDirectReorder(index, newIndex)}
                                />
                                <button
                                    className="order-btn"
                                    onClick={() => moveRelease(index, 1)}
                                    disabled={index === releases.length - 1}
                                    title="Di chuyển xuống"
                                >▼</button>
                            </div>
                            <div className="admin-release-info">
                                {release.imageUrl && (
                                    <img src={release.imageUrl} alt={release.title} className="admin-release-thumb" />
                                )}
                                <span className="admin-release-name">{release.title}</span>
                            </div>
                            <button className="delete-btn" onClick={() => handleDelete(release.id)} title="Xóa">
                                🗑️
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

/* ==================== BACKGROUND TAB ==================== */
function BackgroundTab({ user }) {
    const [bgFile, setBgFile] = useState(null);
    const [bgPreview, setBgPreview] = useState(null);
    const [currentBg, setCurrentBg] = useState(null);
    const [bgList, setBgList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    // Listen to backgrounds history list
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "backgrounds"), (snapshot) => {
            const list = [];
            snapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            // Sort by uploadedAt desc
            list.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
            setBgList(list);
        });
        return () => unsubscribe();
    }, []);

    // Listen to current active background
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "settings", "background"), (docSnap) => {
            if (docSnap.exists()) {
                setCurrentBg(docSnap.data());
            } else {
                setCurrentBg(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleBgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBgFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setBgPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bgFile) { setMessage("⚠️ Vui lòng chọn ảnh nền"); return; }
        setUploading(true);
        setMessage("");
        try {
            const imageUrl = await uploadToCloudinary(bgFile, "lussixuss/background");
            const bgData = {
                imageUrl,
                uploadedAt: new Date().toISOString(),
                updatedBy: user.email,
            };
            
            // 1. Add to backgrounds history collection
            const newDocRef = doc(collection(db, "backgrounds"));
            await setDoc(newDocRef, bgData);

            // 2. Set as active background in settings
            await setDoc(doc(db, "settings", "background"), { imageUrl });

            setMessage("✅ Thêm và áp dụng hình nền thành công!");
            setBgFile(null);
            setBgPreview(null);
        } catch (error) {
            setMessage("❌ Lỗi: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleApply = async (imageUrl) => {
        setUploading(true);
        setMessage("");
        try {
            await setDoc(doc(db, "settings", "background"), { imageUrl });
            setMessage("✅ Đã áp dụng hình nền được chọn!");
        } catch (error) {
            setMessage("❌ Lỗi: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleReset = async () => {
        setUploading(true);
        setMessage("");
        try {
            await setDoc(doc(db, "settings", "background"), { imageUrl: "" });
            setMessage("✅ Đã khôi phục ảnh nền mặc định!");
        } catch (error) {
            setMessage("❌ Lỗi khi khôi phục: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteBg = async (item) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa ảnh nền này khỏi danh sách lưu trữ?")) return;
        setUploading(true);
        setMessage("");
        try {
            await deleteDoc(doc(db, "backgrounds", item.id));
            if (currentBg?.imageUrl === item.imageUrl) {
                await setDoc(doc(db, "settings", "background"), { imageUrl: "" });
            }
            setMessage("✅ Đã xóa hình nền!");
        } catch (error) {
            setMessage("❌ Lỗi khi xóa: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="admin-section">
            <p className="admin-subtitle">Quản lý thư viện hình nền (Background)</p>
            
            <form onSubmit={handleSubmit} className="admin-form" style={{ marginTop: "10px" }}>
                <div className="admin-field">
                    <label>Tải lên hình nền mới</label>
                    <div className="admin-file-input">
                        <input type="file" accept="image/*" onChange={handleBgChange} />
                        <span className="admin-file-label">{bgFile ? bgFile.name : "Chọn ảnh..."}</span>
                    </div>
                    {bgPreview && (
                        <div className="admin-image-preview" style={{ marginTop: "15px" }}>
                            <img src={bgPreview} alt="Preview" style={{ width: "100%", maxHeight: "160px", objectFit: "cover", borderRadius: "8px" }} />
                        </div>
                    )}
                </div>
                <button type="submit" className="admin-submit" disabled={uploading}>
                    {uploading ? "Đang tải lên..." : "💾 Tải lên & Áp dụng ngay"}
                </button>
                {message && <p className="admin-message">{message}</p>}
            </form>

            <div className="admin-release-list" style={{ marginTop: "30px" }}>
                <h3 className="admin-section-title">🖼️ Thư viện hình nền</h3>
                
                {/* Default Background option */}
                <div className="admin-release-item" style={{ 
                    border: !currentBg?.imageUrl ? "2px solid #28a745" : "1px solid rgba(255,255,255,0.1)",
                    background: !currentBg?.imageUrl ? "rgba(40, 167, 69, 0.08)" : "rgba(255,255,255,0.02)"
                }}>
                    <div className="admin-release-info" style={{ display: "flex", alignItems: "center", gap: "15px", flex: 1 }}>
                        <div style={{ 
                            width: "80px", 
                            height: "50px", 
                            backgroundColor: "#1f2022", 
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                            color: "#6c757d",
                            border: "1px dashed #6c757d"
                        }}>
                            Mặc định
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span className="admin-release-name" style={{ fontWeight: "bold" }}>Hình nền gốc (BgInfor.jpg)</span>
                            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>File mặc định đi kèm code nguồn</span>
                        </div>
                    </div>
                    
                    {!currentBg?.imageUrl ? (
                        <span style={{ color: "#28a745", fontWeight: "bold", fontSize: "14px", marginRight: "10px" }}>✓ Đang dùng</span>
                    ) : (
                        <button 
                            type="button" 
                            className="order-btn" 
                            onClick={handleReset}
                            style={{ padding: "6px 12px", backgroundColor: "#db6e0f", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                        >
                            Áp dụng
                        </button>
                    )}
                </div>

                {bgList.map((item) => {
                    const isActive = currentBg?.imageUrl === item.imageUrl;
                    return (
                        <div key={item.id} className="admin-release-item" style={{ 
                            border: isActive ? "2px solid #28a745" : "1px solid rgba(255,255,255,0.1)",
                            background: isActive ? "rgba(40, 167, 69, 0.08)" : "rgba(255,255,255,0.02)"
                        }}>
                            <div className="admin-release-info" style={{ display: "flex", alignItems: "center", gap: "15px", flex: 1 }}>
                                <img src={item.imageUrl} alt="Bg Thumbnail" className="admin-release-thumb" style={{ width: "80px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span className="admin-release-name" style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>
                                        Tải lên ngày: {new Date(item.uploadedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {isActive ? (
                                    <span style={{ color: "#28a745", fontWeight: "bold", fontSize: "14px", marginRight: "10px" }}>✓ Đang dùng</span>
                                ) : (
                                    <button 
                                        type="button" 
                                        className="order-btn" 
                                        onClick={() => handleApply(item.imageUrl)}
                                        style={{ padding: "6px 12px", backgroundColor: "#db6e0f", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                    >
                                        Áp dụng
                                    </button>
                                )}
                                <button 
                                    type="button" 
                                    className="delete-btn" 
                                    onClick={() => handleDeleteBg(item)}
                                    style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminPanel;
