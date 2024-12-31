
# API Retriever

## Cú pháp yêu cầu API (request)

```bash
curl -X 'GET'   'https://awd-llm.azurewebsites.net/retriever/?gemini_api_key={gemini_api_key}&collection_name={collection_name}&query={query}&amount={amount}&threshold={threshold}'   -H 'accept: application/json'
```

### Tham số yêu cầu

- **gemini_api_key** (bắt buộc):  
  Token từ Google Gemini (Xem hướng dẫn lấy tại Google).  
  - Loại: Chuỗi (tối đa 50 ký tự).  
  - VD: `AIzaDASCgfgadVDLi0O6WMMO_1xRadDdsccSD`.  

- **collection_name** (bắt buộc):  
  Tên collection cần tra cứu (nằm trong MongoDB trước đó).  
  - Loại: Chuỗi (tối đa 50 ký tự).  
  - VD: `movies`.  

- **query** (bắt buộc):  
  Câu truy vấn bằng ngôn ngữ tự nhiên.  
  - Loại: Chuỗi (tối đa 250 ký tự).  
  - VD: `Some sad stories made with animation`.  

- **amount** (không bắt buộc):  
  Số lượng kết quả tối đa trả về (mặc định: 25).  
  - Loại: Số nguyên (1 < x ≤ 500).  
  - VD: `10`.  

- **threshold** (không bắt buộc):  
  Mức độ liên quan của kết quả (mặc định: 0.5).  
  - Loại: Số thực (0.0 < x ≤ 1.0).  
  - VD: `0.75`.  

---

## Kết quả trả về (response)

### 1. Thành công
- **Status code**: `200`.  
- **Nội dung**:
```json
{
  "status": 200,
  "data": {
    "result": [
      "67556cb10eac33604a6a3a7f",
      "67556bef0eac33604a6a25f7",
      "67556ad80eac33604a6a05f2"
    ]
  }
}
```

### 2. Lỗi thường gặp

#### a. **Lỗi tham số không hợp lệ**
- **Status code**: `400`.  
- **Nội dung**:
```json
{
  "status": 400,
  "detail": "Gemini API Key must be between 1 and 50 characters"
}
```

#### b. **Lỗi không xác định**
- **Status code**: `500`.  
- **Nội dung**:
```json
{
  "status": 500,
  "detail": "Error searching collection"
}
```