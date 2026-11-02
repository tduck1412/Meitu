/*
 * Script Unlock MeiTu XiuXiu (美图秀秀) SVIP - All-in-One Modern & Legacy
 * Hỗ trợ từ bản cũ 9.x đến bản mới nhất (SVIP / 粉钻SVIP / api-sub / cutout)
 * Tương thích Shadowrocket / Surge / Loon
 */

const url = $request.url;
let body = $response.body;

if (!body) {
    $done({});
} else {
    try {
        let obj = JSON.parse(body);

        if (obj && typeof obj === "object") {
            obj.data = obj.data || {};

            // 1. [MỚI] Hệ thống VIP Group V2 của Meitu (api-sub.meitu.com)
            if (url.includes("/user/vip_info_by_group.json")) {
                obj.data = {
                    ...obj.data,
                    active_sub_type: 2,
                    account_type: 1,
                    sub_type_name: "续期",
                    active_sub_order_id: "666666666666666666",
                    trial_period_invalid_time: "4092599349000",
                    current_order_invalid_time: "4092599349000",
                    active_order_id: "666666666666666666",
                    limit_type: 0,
                    active_sub_type_name: "续期",
                    use_vip: true,
                    have_valid_contract: false,
                    derive_type_name: "普通会员",
                    derive_type: 1,
                    in_trial_period: true,
                    is_vip: true,
                    membership: {
                        id: "7",
                        display_name: "",
                        level: 2,
                        level_name: "高级会员"
                    },
                    active_promotion_status_list: [2, 6],
                    sub_type: 3,
                    account_id: obj.data.account_id || "1666666666",
                    invalid_time: "4092599349000",
                    valid_time: "4092599349000",
                    active_product_id: "0",
                    active_promotion_status: 2,
                    show_renew_flag: false
                };
            }
            // 2. [MỚI] Chi tiết gói VIP bản mới (new_sub_detail.json) & bản cũ (sub_detail.json)
            else if (url.includes("/vip/new_sub_detail.json") || url.includes("/vip/sub_detail.json") || url.includes("/h5/vip/sub_detail")) {
                if (obj.data.materials) delete obj.data.materials;
                if (obj.data.prices) delete obj.data.prices;
                if (obj.data.new_version_rotograms) delete obj.data.new_version_rotograms;

                obj.data.vip_sign_info = {
                    sub_type: 3,
                    renew_status: 1,
                    show_auto_renew: 1,
                    next_withhold_amount: 16800,
                    withhold_currency_symbol: "¥",
                    next_withhold_date: "2099-09-09",
                    pay_channel: "苹果支付",
                    do_pop_up: false
                };
                obj.data.vip_power_num = 999999;
                obj.data.new_power_num = 999999;
                obj.data.welfare_center_num = 999999;
                obj.data.exchange_vip = 0;
                obj.data.platform = 2;
                obj.data.renew = 1;
                obj.data.is_new_vipsub = 0;
                obj.data.s = 1;
                obj.data.expire_days = -66666;
                obj.data.sub_type = 3;
                obj.data.old_vip_type = 4;
                obj.data.valid_time = 4092599349;
                obj.data.invalid_time = 4092599349;
                obj.data.is_expire = 0;
                obj.data.rights_page_vip_btn_title = "立即解锁";
                obj.data.rights_page_svip_btn_title = "立即解锁";
                obj.data.hbp_vip = {
                    sub_type: 3,
                    valid_time: 4092599349,
                    renew: 1,
                    expire_days: -66666,
                    is_expire: 0,
                    in_valid_time: 4092599349,
                    s: 0
                };
                obj.data.xx_vip = {
                    sub_type: 3,
                    valid_time: 4092599349,
                    renew: 1,
                    expire_days: -66666,
                    is_expire: 0,
                    in_valid_time: 4092599349,
                    s: 0
                };
                obj.data.sub_biz_type = 1;
                obj.data.vip_type = 101;
                obj.data.is_vip = 1;
            }
            // 3. [MỚI] Điều hướng VIP SVIP (vip_navigation.json)
            else if (url.includes("/vip/vip_navigation.json")) {
                if (obj.data.rights) delete obj.data.rights;
                if (obj.data.navigation_card_list) delete obj.data.navigation_card_list;
                if (obj.data.config_list) delete obj.data.config_list;
                if (obj.data.pendant) delete obj.data.pendant;

                obj.data.vip_type = 101;
                obj.data.display_vip_time = 1;
                obj.data.display_vip_type = 2;
                obj.data.hbp_vip = {
                    id: "666666666666666666",
                    id_str: "666666666666666666",
                    valid_time: 4092599349,
                    uid: 1666666666,
                    sub_type: 3,
                    sub_biz_type: 1,
                    avatar_url: obj.data.avatar_url || "",
                    is_expire: 0,
                    expire_days: -66666,
                    gid: 1234567890,
                    vip_type: 101,
                    platform: 2,
                    sub_name: "包年",
                    renew: 2,
                    s: 0,
                    is_valid_user: 1,
                    create_time: 1666666666,
                    screen_name: obj.data.screen_name || "VIP Unlocked",
                    in_valid_time: 4092599349
                };
                obj.data.xx_vip = { ...obj.data.hbp_vip };
            }
            // 4. Trang hiển thị VIP (vip_show.json)
            else if (url.includes("/vip/vip_show.json")) {
                obj.data = {
                    ...obj.data,
                    id: obj.data.id || "666666666666666666",
                    id_str: obj.data.id_str || "666666666666666666",
                    valid_time: 4092599349,
                    uid: obj.data.uid || 1666666666,
                    sub_type: 3,
                    expire_days: -66666,
                    in_valid_time: 4092599349,
                    gid: 1234567890,
                    s: 1,
                    vip_type: 101,
                    platform: 2,
                    sub_name: "包年",
                    renew: 2,
                    is_valid_user: 1,
                    create_time: 1666666666,
                    sub_biz_type: 1,
                    is_expire: 0
                };
            }
            // 5. Tắt banner mua VIP & Prompt (/vip/prompt/query.json)
            else if (url.includes("/vip/prompt/query.json")) {
                obj.data = {
                    ...obj.data,
                    home_btn_prompt: "立即查看",
                    if_transfer: 0,
                    pay_interval: 3000,
                    beautify_prompt: "",
                    home_prompt: "会员有效期至2099/09/09",
                    svip_bubble_text: "粉钻SVIP：有效期至2099/09/09\n粉钻VIP：有效期至2099/09/09",
                    beautify_btn_prompt: "",
                    request_time: 1666666666666
                };
            }
            // 6. User Profile (/user/show.json & /v1/user/show)
            else if (url.includes("/user/show.json") || url.includes("/user/show")) {
                obj.data.vip_type = 101;
                obj.data.free_trial = 1;
                obj.data.is_vip = 1;
                obj.data.follower_count = 999000;
                obj.data.fan_count = 999000;
                obj.data.be_like_count = 999000;
            }
            // 7. [MỚI] Trung tâm quyền lợi & Cắt ảnh / Tách nền AI (api.posters.meitu.com)
            else if (url.includes("/center/user_rights.json")) {
                obj.data = {
                    cutout: { num_left: 9999999 }
                };
            } else if (url.includes("/center/user_rights_consume.json")) {
                obj.data = {
                    consume_result: true
                };
            }
            // 8. [MỚI] Center User Info (/center/user_info.json)
            else if (url.includes("/center/user_info.json")) {
                obj.data.vip_end_time = 4092599349;
                obj.data.is_vip = true;
            }
            // 9. [MỚI] User Info Entrance (/user/info_by_entrance.json)
            else if (url.includes("/user/info_by_entrance.json")) {
                obj.data.rights_info = [
                    {
                        show_tips: "抠图剩余张数：9999999 张 >",
                        commodity_unit: "2",
                        link_words: "9999999 张 >",
                        commodity_id: "shejishi.cutout",
                        commodity_count: 9999999
                    }
                ];
                if (obj.data.vip_info) {
                    obj.data.vip_info.is_vip = true;
                    obj.data.vip_info.use_vip = true;
                    obj.data.vip_info.valid_time = "4092599349000";
                    obj.data.vip_info.invalid_time = "4092599349000";
                }
            }
            // 10. [MỚI] Tắt banner trang chủ (/home/home.json)
            else if (url.includes("/home/home.json")) {
                if (obj.data.banner) delete obj.data.banner;
            }
            // 11. Legacy Account (/account/verify_credentials.json & user_detail)
            else if (url.includes("/account/verify_credentials")) {
                obj.data.vip_type = 101;
                obj.data.free_trial = 1;
                obj.data.is_vip = true;
            } else if (url.includes("/user_detail.json")) {
                obj.data.is_expire = 0;
                obj.data.valid_time = 1642342530;
                obj.data.invalid_time = 4092599349;
                obj.data.old_vip_type = 4;
                obj.data.sub_type = 8;
                obj.data.show_auto_renew = 0;
                obj.data.expire_days = -66666;
                obj.data.renew = 1;
                obj.data.is_vip = 1;
            }

            body = JSON.stringify(obj);
        }
    } catch (e) {
        // Tránh crash nếu response không phải JSON
    }

    $done({ body: body });
}
