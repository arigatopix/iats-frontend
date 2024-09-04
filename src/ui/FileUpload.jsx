import React, { useState } from "react";
import { supaBACKEND_URL } from "../services/supabase";
import FileInput from "./FileInput";
import Table from "./Table";
import Input from "./Input";
import ButtonIcon from "./ButtonIcon";
import { HiOutlinePaperClip, HiOutlineTrash } from "react-icons/hi2";
import styled from "styled-components";
import FormRow from "./FormRow";
import Button from "./Button";
import { useFieldArray } from "react-hook-form";
import FormHeader from "./FormHeader";
import { useUpload } from "../hooks/useUpload";
import SpinnerMini from "./SpinnerMini";
import { useDeleteAttachment } from "../features/attachment/useDeleteAttachment";

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

function FileUpload({ id, control, disabled = false }) {
  const [file, setFile] = useState(null);
  const [fileTitle, setFileTitle] = useState("");

  const { fileUpload, isUploading } = useUpload();

  const { fields, append, remove } = useFieldArray({
    control,
    name: id,
    keyName: "fieldId",
  });

  const isDisable = disabled || isUploading;

  function handleFileChange(e) {
    const files = e.target?.files;
    if (files) {
      setFile(files[0]);
      setFileTitle(files[0]?.name);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();

    const type = file.type.split("/")[1];

    if (file) {
      const fileName =
        `${Math.random()}`.replace("/", "").replace(" ", "") + `.${type}`;

      fileUpload(
        {
          fileName,
          file,
          folder: "project_files",
        },
        {
          onSuccess: data => {
            append({
              title: fileTitle,
              url: `${supaBACKEND_URL}/storage/v1/object/public/${data.fullPath}`,
            });

            setFile(null);
          },
        }
      );
    }
  }

  return (
    <WrapFileUpload>
      <FormHeader>อัพโหลดไฟล์ที่เกี่ยวข้อง</FormHeader>
      <FormRow label="">
        <FileInput
          id={id}
          onChange={handleFileChange}
          disabled={isDisable}
          accept="application/pdf,image/png,image/jpg"
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
            onClick={() => setFile(null)}
          >
            ยกเลิก
          </Button>
        </WrapFormRow>
      )}

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
              disabled={isDisable}
              name={id}
            />
          )}
        />
      </Table>
    </WrapFileUpload>
  );
}

export default FileUpload;

const FileRow = ({ file, index, remove, disabled, name }) => {
  const { deleteAttachment } = useDeleteAttachment();

  return (
    <Table.Row>
      <p>{file.title}</p>

      <WrapIconButton>
        <ButtonIcon as="a" href={file.url} target="_blank" rel="noreferrer">
          <HiOutlinePaperClip />
        </ButtonIcon>
        {!disabled && (
          <ButtonIcon
            onClick={() => {
              remove(index);

              if (file.id) deleteAttachment({ id: file.id, type: name });
            }}
          >
            <HiOutlineTrash />
          </ButtonIcon>
        )}
      </WrapIconButton>
    </Table.Row>
  );
};
