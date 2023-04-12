import React from "react";
import { Card, Form, Col, Button } from "react-bootstrap";
import { UserInfo } from './user-info/user-info';
import { AddFavorite } from './add-favorite/add-favorite';
import { UserDelete } from './user-delete/user-delete';
import { UserUpdate } from './user-update/user-update';

export const ProfileView = () => {
  return (
    <>
    <UserInfo />
    <AddFavorite />
    <UserUpdate />
    <UserDelete />
    </>
    
)
}
