import React, { useCallback, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ByteConverter from "byte-converter-react";
import { useDropzone } from "react-dropzone";
import ADDRESS from "../../../../ADDRESS";
import { UploadContainer, Title, ButtonContainer } from "./UploadPdf.styles";
import {
  UploadFile,
  GetPdfFile,
  DeletePdfFile,
} from "../../../../core/api/upload-pdf";

const UploadPdf = () => {
  const [pdfName, setPdfname] = useState();
  const [pdfSize, setPdfSize] = useState();
  const [loadedPdf, setLoadedPdf] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const fd = new FormData();
      fd.append("PDF", file);

      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
      };

      if (5243000 > file.size && file.type === "application/pdf") {
        const postForm = async () => {
          try {
            await UploadFile(fd);
            setPdfname(file.name);
            setPdfSize(file.size);

            Swal.fire({
              icon: "success",
              title: "فایل با موفقیت آپلود شد",
              showConfirmButton: false,
              timer: 1750,
            });
            LoadPdfFile();
          } catch (err) {
            err.response?.data?.message?.map((e) => {
              toast.error(e);
            });
          }
        };

        postForm();
      } else {
        if (file.type !== "application/pdf") {
          toast.error("فرمت فایل بارگذاری شده صحیح نمی باشد");
        } else if (5243000 > file.size) {
          toast.error(" فایل بارگذاری شده بیش از حد مجاز است");
        }
      }
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    LoadPdfFile();
  }, []);

  const LoadPdfFile = async () => {
    const res = await GetPdfFile();
    setLoadedPdf(res.resul);
  };

  const handleDeletePdfFile = async () => {
    Swal.fire({
      title: "آیا مطمئن هستید میخواهید حذف کنید؟",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      cancelButtonText: "خیر",
      confirmButtonText: "بله مطمئن هستم",
    }).then((result) => {
      if (result.value) {
        const fetchData = async () => {
          try {
            const res = await DeletePdfFile();
            setLoadedPdf(null);
            setPdfname(null);
            setPdfSize(null);
            Swal.fire({
              icon: "success",
              title: "با موفقیت حذف شد",
              showConfirmButton: false,
              timer: 1750,
            });
          } catch (err) {
            err.response.data.message &&
              err.response.data.message.map((er) => toast.error(er));
          }
        };

        fetchData();
      }
    });
  };

  return (
    <div>
      <h3 className="d-block text-right ir-b smb-3 c-dark">
        بارگذاری فایل pdf
      </h3>
      <div className="bg-white srounded-md sp-2 smb-3">
        <div className="row">
          <div className="col-12">
            <div className="content d-lg-flex flex-column justify-content-center">
              <ul className="list-group list-group-flush p-0">
                <ButtonContainer>
                  <Title>حداکثر سایز مجاز برای آپلود : 5 مگابایت</Title>
                  <ButtonContainer>
                    {loadedPdf && (
                      <a
                        className="btn btn-info ml-2"
                        href={`${ADDRESS}pdf/resomepdf/${loadedPdf}`}
                      >
                        دانلود
                      </a>
                    )}
                    {loadedPdf && (
                      <span
                        onClick={handleDeletePdfFile}
                        className="btn btn-danger"
                      >
                        حذف
                      </span>
                    )}
                  </ButtonContainer>
                </ButtonContainer>
                <li className="list-group-item border-0 pr-0">
                  <UploadContainer {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p style={{ textAlign: "center" }}>
                      {loadedPdf
                        ? "آپلود فایل جدید"
                        : "فایل خود را بارگذاری کنید"}
                    </p>
                  </UploadContainer>
                  {pdfName && (
                    <Title> فایل {pdfName} با موفقیت آپلود شد </Title>
                  )}
                  {pdfSize && (
                    <Title>
                      سایز فایل :{" "}
                      <ByteConverter inUnit="B" outUnit="MB">
                        {pdfSize}
                      </ByteConverter>{" "}
                      مگابایت
                    </Title>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UploadPdf };
