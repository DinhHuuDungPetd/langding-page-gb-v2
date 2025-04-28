import os
from unidecode import unidecode
import re

def rename_files_in_directory(directory_path):
    # Kiểm tra xem thư mục có tồn tại không
    if not os.path.exists(directory_path):
        print(f"Thư mục '{directory_path}' không tồn tại.")
        return

    # Duyệt qua tất cả các file trong thư mục
    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path, filename)

        # Bỏ qua nếu là thư mục con
        if os.path.isfile(file_path):
            # Tách tên file và phần mở rộng
            name, ext = os.path.splitext(filename)

            # Chuyển tên sang không dấu
            new_name = unidecode(name)

            # Thay dấu cách bằng dấu gạch ngang và loại bỏ ký tự đặc biệt
            new_name = re.sub(r'\s+', '-', new_name)
            new_name = re.sub(r'[^a-zA-Z0-9\-]', '', new_name)

            # Tạo tên file mới
            new_filename = new_name + ext
            new_file_path = os.path.join(directory_path, new_filename)

            # Đổi tên file
            try:
                os.rename(file_path, new_file_path)
                print(f"Đổi tên: '{filename}' -> '{new_filename}'")
            except Exception as e:
                print(f"Lỗi khi đổi tên '{filename}': {e}")

if __name__ == "__main__":
    # Đường dẫn thư mục cần đổi tên file
    directory = "D:\petd working\GreenLab\langding-page-green-lab\public\icons\services"  # Thay bằng đường dẫn thư mục của bạn
    rename_files_in_directory(directory)