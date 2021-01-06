import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ByteConverter from "byte-converter-react";
import { useDropzone } from "react-dropzone";

import { UploadContainer, Title } from "./UploadPdf.styles";
import { UploadFile } from "../../../../core/api/upload-pdf";

const UploadPdf = () => {
  const [pdfName, setPdfname] = useState();
  const [pdfSize, setPdfSize] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const fd = new FormData();
      fd.append("PDF", file);

      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };

      if (5243000 > file.size && file.type === "application/pdf") {
        setPdfname(file.name);
        setPdfSize(file.size);
        const postForm = async () => {
          try {
            await UploadFile(fd);

            Swal.fire({
              icon: "success",
              title: "فایل با موفقیت آپلود شد",
              showConfirmButton: false,
              timer: 1750,
            });
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
                <Title>حداکثر سایز مجاز برای آپلود : 5 مگابایت</Title>
                <li className="list-group-item border-0 pr-0">
                  <UploadContainer {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p style={{ textAlign: "center" }}>
                      فایل خود را بارگذاری کنید
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
