# Nghiên cứu & Kiến trúc VIP Meitu XiuXiu (美图秀秀) 

---

## 1. Sự khác biệt giữa Bản Cũ (2022) và Bản Mới Nhất (Hiện tại)

### 📌 Bản cũ (2022 - duyvinh09):
- Chỉ bắt các URL dạng cũ: `/v1/h5/vip/sub_detail.json`, `/v1/vip/vip_show.json`, `/v1/user/show.json`.
- Gán VIP thường (`vip_type: 101` hoặc `vip_type: 1`).
- Bị giới hạn ở domain cũ `h5.xiuxiu.meitu.com` và `api.xiuxiu.meitu.com`.

### 🚀 Bản mới nhất (Hiện tại - Đã cập nhật All-in-One):
- **Kiến trúc V2 Group VIP**: Toàn bộ hệ thống gói thuê bao của Meitu đã chuyển về trung tâm đăng ký `api-sub.meitu.com/v2/user/vip_info_by_group.json`.
- **Nâng cấp gói Pink SVIP (粉钻SVIP)**: Mở khóa các cấp độ cao nhất (`level: 2`, `level_name: "高级会员"`, `hbp_vip`, `xx_vip`).
- **Quyền lợi tách nền AI (Cutout)**: Mở khóa API `api.posters.meitu.com/center/user_rights.json` cấp 9,999,999 lượt tách nền AI.
- **Hệ thống điều hướng mới**: Hỗ trợ `/vip/new_sub_detail.json`, `/vip/vip_navigation.json`, `/center/user_info.json`.
- **Tương thích ngược**: Vẫn giữ nguyên logic mở khóa cho các máy chạy phiên bản cũ.

---

## 2. File cấu hình & Script

- **Module độc lập cho Shadowrocket**: [`Meitu.sgmodule`](file:///home/tduc/Downloads/scamlocket/Meitu.sgmodule)
- **Script xử lý chính**: [`MeiTuXiuXiu.js`](file:///home/tduc/Downloads/scamlocket/MeiTuXiuXiu.js)
- **Bộ kiểm thử tự động QuickJS**: [`meitu_research/test_meitu.py`](file:///home/tduc/Downloads/scamlocket/meitu_research/test_meitu.py)
