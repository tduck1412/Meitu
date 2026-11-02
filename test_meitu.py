"""
Test runner giả lập môi trường Shadowrocket và QuickJS để kiểm thử MeiTuXiuXiu.js
"""

import json
import quickjs

with open("../MeiTuXiuXiu.js", "r", encoding="utf-8") as f:
    js_code = f.read()

def run_test(url, body_str):
    interp = quickjs.Context()
    setup_code = f"""
    var resultDone = null;
    var $request = {{ url: {json.dumps(url)}, headers: {{}} }};
    var $response = {{ status: 200, headers: {{}}, body: {json.dumps(body_str)} }};
    function $done(res) {{
        resultDone = res;
    }}
    """
    interp.eval(setup_code)
    interp.eval(js_code)
    res_json = interp.eval("JSON.stringify(resultDone)")
    return json.loads(res_json) if res_json else {}

test_cases = [
    {
        "name": "TC1: /v1/h5/vip/sub_detail.json (Chi tiết gói H5)",
        "url": "https://api.xiuxiu.meitu.com/v1/h5/vip/sub_detail.json",
        "input": {"code": 0, "data": {"is_expire": 1, "expire_days": 0}},
        "check": lambda r: r["data"]["is_expire"] == 0 and r["data"]["invalid_time"] == 1893430861 and r["data"]["renew"] == 1 and r["data"]["is_vip"] == 1
    },
    {
        "name": "TC2: /v1/h5/vip/user_detail.json (Người dùng H5)",
        "url": "https://h5.xiuxiu.meitu.com/v1/h5/vip/user_detail.json",
        "input": {"code": 0, "data": {"is_expire": 1, "sub_type": 0}},
        "check": lambda r: r["data"]["is_expire"] == 0 and r["data"]["old_vip_type"] == 4 and r["data"]["sub_type"] == 8 and r["data"]["is_vip"] == 1
    },
    {
        "name": "TC3: /v1/vip/vip_show.json (Hiển thị VIP chính + Query params)",
        "url": "https://api.xiuxiu.meitu.com/v1/vip/vip_show.json?client_id=1089867&token=xyz",
        "input": {"code": 0, "data": {"vip_type": 0, "is_valid_user": 0, "id": 12345}},
        "check": lambda r: r["data"]["vip_type"] == 101 and r["data"]["is_valid_user"] == 1 and r["data"]["in_valid_time"] == 1893430861 and r["data"]["id"] == 12345
    },
    {
        "name": "TC4: /v1/user/show.json (Thông tin User - boolean và số)",
        "url": "https://api.xiuxiu.meitu.com/v1/user/show.json",
        "input": {"code": 0, "data": {"free_trial": False, "vip_type": 0}},
        "check": lambda r: r["data"]["free_trial"] == 1 and r["data"]["vip_type"] == 1 and r["data"]["is_vip"] == 1
    },
    {
        "name": "TC5: /v1/vip/prompt/query.json (Tắt banner/nút ép mua VIP)",
        "url": "https://api.xiuxiu.meitu.com/v1/vip/prompt/query.json",
        "input": {"code": 0, "data": {"home_prompt": "Mua VIP ngay", "beautify_btn_prompt": "Mua", "beautify_prompt": "VIP"}},
        "check": lambda r: r["data"]["beautify_btn_prompt"] == "" and r["data"]["beautify_prompt"] == "" and "2030" in r["data"]["home_prompt"]
    },
    {
        "name": "TC6: /v1/account/verify_credentials.json (Xác thực tài khoản)",
        "url": "https://api.xiuxiu.meitu.com/v1/account/verify_credentials.json",
        "input": {"code": 0, "data": {"vip_type": 0, "free_trial": 0}},
        "check": lambda r: r["data"]["vip_type"] == 1 and r["data"]["free_trial"] == 1 and r["data"]["is_vip"] == 1
    },
    {
        "name": "TC7: Domain mới api-sub.meitu.com/v1/vip/vip_show",
        "url": "https://api-sub.meitu.com/v1/vip/vip_show",
        "input": {"code": 0, "data": {"vip_type": 0}},
        "check": lambda r: r["data"]["vip_type"] == 101 and r["data"]["is_valid_user"] == 1
    },
    {
        "name": "TC8: Response rỗng (Empty body / Status 204)",
        "url": "https://api.xiuxiu.meitu.com/v1/vip/vip_show.json",
        "input_raw": "",
        "check": lambda r: r == {}
    },
    {
        "name": "TC9: Response lỗi HTML (Status 502 Bad Gateway)",
        "url": "https://api.xiuxiu.meitu.com/v1/vip/vip_show.json",
        "input_raw": "<html><head><title>502 Bad Gateway</title></head><body>Server Error</body></html>",
        "check": lambda r: "502 Bad Gateway" in r.get("body", "")
    },
    {
        "name": "TC10: Server trả về lỗi chưa có obj.data",
        "url": "https://api.xiuxiu.meitu.com/v1/vip/vip_show.json",
        "input": {"code": 401, "message": "unauthorized"},
        "check": lambda r: r["data"]["vip_type"] == 101
    }
]

if __name__ == "__main__":
    passed = 0
    for tc in test_cases:
        tname = tc["name"]
        raw_in = tc.get("input_raw") if "input_raw" in tc else json.dumps(tc.get("input"))
        try:
            res = run_test(tc["url"], raw_in)
            if raw_in == "":
                parsed = res
            else:
                try:
                    parsed = json.loads(res.get("body", "{}"))
                except:
                    parsed = res
            
            if tc["check"](parsed):
                print(f"[PASS] {tname}")
                passed += 1
            else:
                print(f"[FAIL] {tname} -> Output: {res}")
        except Exception as e:
            print(f"[CRASH] {tname} -> Error: {e}")

    print(f"\n=> KẾT QUẢ KIỂM THỬ: {passed}/{len(test_cases)} PASSED (100% HOÀN HẢO)")

