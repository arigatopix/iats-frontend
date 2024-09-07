import React, { createContext, useContext, useRef, useState } from "react";
import FileInput from "../../ui/FileInput";
import Table from "../../ui/Table";
import Input from "../../ui/Input";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiOutlinePaperClip, HiOutlineTrash } from "react-icons/hi2";
import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useFieldArray } from "react-hook-form";
import FormHeader from "../../ui/FormHeader";
import { useUpload } from "./useUpload";
import SpinnerMini from "../../ui/SpinnerMini";
import { useDeleteAttachment } from "../attachment/useDeleteAttachment";
import { allowedExtensions } from "../../utils/helpers";
import { useReadFile } from "./useReadFile";
import { useDeleteFile } from "./useDeleteFile";

const WrapFileUpload = styled.section`
  margin-top: 3rem;
`;

const WrapFormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const WrapIconButton = styled.div`
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  align-items: start;
`;

const FileUploadContext = createContext();

function FileUpload({
  id,
  control,
  disabled = false,
  label = "อัพโหลดไฟล์ที่เกี่ยวข้อง",
  children,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: id,
    keyName: "fieldId",
  });

  return (
    <FileUploadContext.Provider
      value={{
        control,
        disabled,
        label,
        id,
        append,
        remove,
        fields,
      }}
    >
      <WrapFileUpload>{children}</WrapFileUpload>
    </FileUploadContext.Provider>
  );
}

function Label() {
  const { label } = useContext(FileUploadContext);
  return <FormHeader>{label}</FormHeader>;
}
function Upload() {
  const inputFile = useRef();
  const { id, disabled, append } = useContext(FileUploadContext);

  const [file, setFile] = useState(null);
  const [fileTitle, setFileTitle] = useState("");
  const [error, setError] = useState("");

  const { fileUpload, isUploading } = useUpload();

  const isDisable = disabled || isUploading;

  function handleFileChange(e) {
    setError("");

    const files = e.target?.files;

    if (files) {
      if (!allowedExtensions.includes(files[0].type)) {
        setFile(null);
        setFileTitle("");
        setError("อัพโหลดได้เฉพาะไฟล์ pdf, png, jpg เท่านั้น");

        if (inputFile.current) {
          inputFile.current.value = "";
          inputFile.current.type = "text";
          inputFile.current.type = "file";
        }
        return;
      }

      setFile(files[0]);
      setFileTitle(files[0]?.name);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    if (file) {
      fileUpload(
        {
          formData,
        },
        {
          onSuccess: data => {
            const { url, path } = data;

            append({
              title: fileTitle,
              url: url,
              path: path,
            });

            setFile(null);
          },
        }
      );
    }
  }

  function handleReset() {
    setFile(null);
    setFileTitle("");
    setError("");

    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  }

  return (
    <>
      <FormRow label="" error={error}>
        <FileInput
          ref={inputFile}
          id={id}
          onChange={handleFileChange}
          disabled={isDisable}
          accept={allowedExtensions.toString()}
        />
      </FormRow>
      {file && (
        <WrapFormRow>
          <FormRow label="ชื่อไฟล์">
            <Input
              id="fileTitle"
              value={fileTitle}
              onChange={e => setFileTitle(e.target.value)}
              disabled={isDisable}
            />
          </FormRow>

          <Button onClick={handleUpload} disabled={isDisable}>
            {!isUploading ? "อัปโหลด" : <SpinnerMini />}
          </Button>

          <Button
            variation="secondary"
            disabled={isDisable}
            onClick={handleReset}
          >
            ยกเลิก
          </Button>
        </WrapFormRow>
      )}
    </>
  );
}

function FileTable() {
  const { fields, remove, disabled, id } = useContext(FileUploadContext);

  return (
    <Table columns="1fr auto">
      <Table.Header>
        <div>ชื่อไฟล์</div>
      </Table.Header>
      <Table.Body
        data={fields}
        render={(file, index) => (
          <FileRow
            key={file.fieldId}
            file={file}
            index={index}
            remove={remove}
            disabled={disabled}
            name={id}
          />
        )}
      />
    </Table>
  );
}

function FileRow({ file, index, remove, disabled, name }) {
  const { deleteAttachment, isDeleting } = useDeleteAttachment();
  const { readFile, isReadingFile } = useReadFile();
  const { deleteFile, isDeletingFile } = useDeleteFile();

  const isProcess = isDeleting || isReadingFile || isDeletingFile;

  function handleReadFile() {
    console.log(file);
    readFile(
      { path: file.path },
      {
        onSuccess: data => {
          const { url } = data;
          window.open(url, "_blank");
        },
      }
    );
  }

  function handleDeleteFile() {
    remove(index);

    if (file.id) {
      deleteAttachment({ id: file.id, type: name });
      deleteFile({ path: file.path });
    }
  }

  return (
    <Table.Row>
      <p>{file.title}</p>

      <WrapIconButton>
        <ButtonIcon onClick={handleReadFile} disabled={isProcess} type="button">
          <HiOutlinePaperClip />
        </ButtonIcon>
        {!disabled && (
          <ButtonIcon
            disabled={isProcess}
            type="button"
            onClick={handleDeleteFile}
          >
            <HiOutlineTrash />
          </ButtonIcon>
        )}
      </WrapIconButton>
    </Table.Row>
  );
}

FileUpload.Label = Label;
FileUpload.Upload = Upload;
FileUpload.Table = FileTable;

export default FileUpload;
