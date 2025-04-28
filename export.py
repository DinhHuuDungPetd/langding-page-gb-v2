import os

def generate_image_array(directory_path, relative_path_prefix="/images/partner"):
    # Kiểm tra xem thư mục có tồn tại không
    if not os.path.exists(directory_path):
        print(f"Thư mục '{directory_path}' không tồn tại.")
        return ""

    # Danh sách các định dạng file ảnh hỗ trợ
    image_extensions = (".png", ".jpg", ".jpeg", ".gif", ".bmp")

    # Lấy danh sách file ảnh
    image_files = [
        f for f in os.listdir(directory_path)
        if os.path.isfile(os.path.join(directory_path, f))
        and f.lower().endswith(image_extensions)
    ]

    if not image_files:
        print(f"Không tìm thấy file ảnh trong thư mục '{directory_path}'.")
        return ""

    # Tạo chuỗi đầu ra
    output = "const images = [\n"
    for i, filename in enumerate(image_files):
        # Tạo đường dẫn tương đối
        src = f"{relative_path_prefix}/{filename}"
        # Thêm object vào chuỗi
        output += "    {\n"
        output += f"        src: \"{src}\",\n"
        output += "        alt: \"Original image\",\n"
        output += "    }"
        # Thêm dấu phẩy nếu không phải phần tử cuối
        if i < len(image_files) - 1:
            output += ","
        output += "\n"
    output += "]"

    return output

if __name__ == "__main__":
    # Đường dẫn thư mục chứa ảnh
    directory = "D:\petd working\GreenLab\langding-page-green-lab\public/images/partner"  # Thay bằng đường dẫn thư mục thực tế
    result = generate_image_array(directory)
    print(result)

    # Ghi chuỗi vào file nếu cần
    with open("image_array.js", "w", encoding="utf-8") as f:
        f.write(result)