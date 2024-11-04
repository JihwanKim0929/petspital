import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "../ui/file-button";
import { Field } from "../ui/field";
import { Button } from "../ui/button";

const PetDiaryPageCreateModalButton = ({ diaryID }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  const contentValue = watch('content');

  const onSubmit = async (data) => {
    const formData = new FormData();
    const diaryPageDto = {
      content: data.content,
    };
    const json = JSON.stringify(diaryPageDto);
    const blob = new Blob([json],{type: "application/json"});
    formData.append("DiaryPageDto",blob);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await fetch(`/diary/${diaryID}/page`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to create diary page');
      }

      reset();
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setValue('image', file);
  };

  const resetForm = () => {
    reset();
    setSelectedFile(null);
  };

  return (
    <DialogRoot minH='1000px'>
      <DialogTrigger>
        <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
          Create New Page
        </Button>
      </DialogTrigger>
      <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody pb={6}>
            <Field label="Content" required>
              <Input 
                placeholder="Enter content" 
                {...register('content', { required: true })} 
              />
            </Field>
            <Field label="Image" mt={4}>
              <FileUploadRoot onChange={handleFileChange}>
                <FileUploadTrigger asChild>
                  <Button variant="outline" size="sm">
                    Upload file
                  </Button>
                </FileUploadTrigger>
                <FileUploadList />
              </FileUploadRoot>
            </Field>
          </DialogBody>

          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button 
                type="submit" 
                isDisabled={!contentValue}
              >
                Create New Page
              </Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
            </DialogActionTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}

export default PetDiaryPageCreateModalButton;