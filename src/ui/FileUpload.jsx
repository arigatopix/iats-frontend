import React, { useState } from "react";
import supabase, { supabaseUrl } from "../services/supabase";
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
  const [status, setStatus] = useState("pending");

  const { fields, append, remove } = useFieldArray({
    control,
    name: id,
  });

  function handleFileChange(e) {
    const files = e.target?.files;
    if (files) {
      setFile(files[0]);
      setFileTitle(files[0]?.name);
      setStatus("pending");
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (file) {
      try {
        setStatus("uploading");

        const fileName = `${Math.random()}-${file.name}`.replace("/", "");

        const { data, error } = await supabase.storage
          .from("iats-bucket/project_files")
          .upload(fileName, file, {
            upsert: true,
          });

        if (error) {
          console.log("error", error.message);
          throw new Error(error.message);
        }

        append({
          id: data.id,
          title: fileTitle,
          url: `${supabaseUrl}/storage/v1/object/public/iats-bucket/project_files/${fileName}`,
        });

        setStatus("success");

        setFile(null);
      } catch (error) {
        console.log(error.message);
        setStatus("fail");
      }
    }
  }

  return (
    <WrapFileUpload>
      <FormHeader>อัพโหลดไฟล์ที่เกี่ยวข้อง</FormHeader>
      <FormRow label="">
        <FileInput id={id} onChange={handleFileChange} disabled={disabled} />
      </FormRow>

      {file && (
        <WrapFormRow>
          <FormRow label="ชื่อไฟล์">
            <Input
              id="fileTitle"
              value={fileTitle}
              onChange={e => setFileTitle(e.target.value)}
            />
          </FormRow>

          <Button onClick={handleUpload}>อัปโหลด</Button>

          <Button variation="secondary" onClick={() => setFile(null)}>
            ยกเลิก
          </Button>
        </WrapFormRow>
      )}

      <Result status={status} />

      <Table columns="1fr auto">
        <Table.Header>
          <div>ชื่อไฟล์</div>
        </Table.Header>
        <Table.Body
          data={fields}
          render={(file, index) => (
            <FileRow
              key={file.id}
              file={file}
              index={index}
              remove={remove}
              disabled={disabled}
            />
          )}
        />
      </Table>
    </WrapFileUpload>
  );
}

export default FileUpload;

const FileRow = ({ file, index, remove, disabled }) => {
  return (
    <Table.Row>
      <p>{file.title}</p>

      <WrapIconButton>
        <ButtonIcon as="a" href={file.url} target="_blank" rel="noreferrer">
          <HiOutlinePaperClip />
        </ButtonIcon>
        {!disabled && (
          <ButtonIcon onClick={() => remove(index)}>
            <HiOutlineTrash />
          </ButtonIcon>
        )}
      </WrapIconButton>
    </Table.Row>
  );
};

const Result = ({ status }) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};
