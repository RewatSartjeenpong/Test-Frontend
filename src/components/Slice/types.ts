/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts

export interface newForm {
  id?: string;
  title: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  idCardNumber:string;
  gender: string[];
  mobileNumber: string;
  passportNumber: string;
  expectedSalary: string;
}


export interface UserData {
  [x: string]: any;
  key: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  nationality: string;
}


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  nationality: string;
}

export interface FormValues {
  title: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  idCardNumber: string;
  gender: string[];
  mobileNumber: string;
  passportNumber: string;
  expectedSalary: string;
}

export type EditUser = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  birthDate: string;
  nationality: string;
  idCardNumber: {
    part1: string;
    part2: string;
    part3: string;
    part4: string;
    part5: string;
  };
  mobileNumber: string;
  passportNumber: string;
  expectedSalary: string;
  gender: string[];
};

