import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Text } from '@chakra-ui/react';
import { Button } from "../ui/button";
import { toaster } from '../ui/toaster';


const AccountDeleteModalButton = () => {

    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                sessionStorage.removeItem('user');
                navigate('/');
                toaster.create({
                    title: "Successfully deleted account.",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
            } else {
                throw new Error('Failed to delete account');
            }
        } catch (err) {
            console.log("Failed to delete account.");
        }
    }

    return (
        <div className="accountDeleteModalButton">
            <DialogRoot minH='1000px'>
                <DialogTrigger>
                    <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
                        Delete Account
                    </Button>
                </DialogTrigger>
                <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                    <DialogCloseTrigger />
                    <DialogHeader>
                    <DialogTitle>Deleting Account</DialogTitle>
                    </DialogHeader>
                    <DialogBody pb={6}>
                        <Text>Are you really want to delete account?</Text>
                    </DialogBody>

                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button onClick={handleDeleteAccount}>Delete Account</Button>
                        </DialogActionTrigger>
                        <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </div>
    )
}

export default AccountDeleteModalButton