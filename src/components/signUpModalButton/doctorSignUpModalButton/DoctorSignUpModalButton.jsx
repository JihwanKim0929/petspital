import React from 'react'
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
} from "../../../components/ui/dialog";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "../../../components/ui/file-button";
import { Field } from "../../../components/ui/field";
import { PasswordInput } from "../../../components/ui/password-input";
import { Button } from "../../../components/ui/button";
import { useForm } from 'react-hook-form';

const DoctorSignUpModalButton = () => {

  const { register, handleSubmit, errors, reset, setValue } = useForm();

  const onSubmit = (data) => {
    const userDto = {
      username: data.username,
      password: data.password,
      email: data.email,
      address: data.hospitaladdress,
      phone_num: data.phonenumber,
      role: "DOCTOR"
    };
    console.log(data.image);
    const dataImage = data.image;
    const formData = new FormData();
    if (dataImage) {
      formData.append("image", dataImage);
    }
    const json = JSON.stringify(userDto);
    const blob = new Blob([json],{type: "application/json"});
    formData.append("userDto",blob);
    const url = "http://localhost:8080/user";
    fetch(url,{
        method: 'POST',
        body: formData,
        headers: {}
    });
    reset();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file);
    console.log("Selected file:", file);
  };

  const resetForm = () => {
    reset();
  };

    return (
      <DialogRoot minH='1000px'>
        <DialogTrigger>
          <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
            Create Doctor Account
          </Button>
        </DialogTrigger>
        <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create doctor account</DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger />
            <DialogBody pb={6}>
              <Field label="Username" required>
                <Input placeholder="Enter your ID" {...register('username', { required: true })}/>
              </Field>
              <Field label="Password" required mt={4}>
                <PasswordInput placeholder='Input password' {...register('password', { required: true })}/>
              </Field>
              <Field label="Email" required mt={4}>
                <Input placeholder='Input your email' {...register('email', { required: true })}/>
              </Field>
              <Field label="Phone Number" required mt={4}>
                <Input placeholder='Input phone number' {...register('phonenumber', { required: true })}/>
              </Field>
              <Field label="Hospital Address" required mt={4}>
                <Input placeholder='Input hospital address' {...register('hospitaladdress', { required: true })}/>
              </Field>
              <Field label="Profile Image" mt={4}>
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
              <Button type="submit">Make Account</Button>
              <DialogActionTrigger asChild>
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
              </DialogActionTrigger>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogRoot>
    );
}

export default DoctorSignUpModalButton