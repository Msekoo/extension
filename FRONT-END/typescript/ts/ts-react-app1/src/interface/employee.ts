/*
 * @Author: your name
 * @Date: 2020-04-16 18:27:19
 * @LastEditTime: 2020-04-16 18:29:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/FRONT-END/typescript/ts/ts-react-app/src/interface/employee.ts
 */
export interface EmployeeRequest {
    name: string;
    departmentId: number | undefined;
}

interface EmployeeInfo {
    id: number;
    key: number;
    name: string;
    department: string;
    hiredate: string;
    level: string;
}

export type EmployeeResponse = EmployeeInfo[] | undefined