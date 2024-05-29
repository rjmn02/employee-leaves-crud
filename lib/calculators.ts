import { Employee } from '@prisma/client';
import prisma from '@/lib/prisma';
import { FILE } from 'dns';

function validateSalary(salary: number) {
  if (salary < 0) {
    throw new Error('Monthly salary must be greater than 0(broke ass mf)');
  }
}

export const computeSSS = (basePay: number) => {
  validateSalary(basePay);
  
  const generateRanges = (start: number, end: number, increment: number): number[] => {
    const ranges: number[] = [];
    for (let i = start; i < end; i += increment) {
      ranges.push(i);
    }
    return ranges;
  }

  const SALARY_START = 4250;
  const SALARY_END = 29750;
  const SALARY_INCREMENT = 500;
  const salaryRanges = generateRanges(SALARY_START, SALARY_END, SALARY_INCREMENT);

  const DEDUCTION_START = 570;
  const DEDUCTION_END = 4230;
  const DEDUCTION_INCREMENT = 70;
  const contributions = generateRanges(DEDUCTION_START, DEDUCTION_END, DEDUCTION_INCREMENT);

  for (let i = 0; i < salaryRanges.length; i++) {
    const lowerRange = salaryRanges[i];
    const upperRange = lowerRange + SALARY_INCREMENT;
    if (basePay >= lowerRange && basePay <= upperRange) {
      return contributions[i];
    }
  }

  if (basePay > SALARY_END) {
    return contributions[contributions.length-1];
  }

  return contributions[0];
}

export const computePhilHealth = (basePay: number) => {
  validateSalary(basePay);
  return basePay * 0.05;
}

export const computePagIbig = (basePay: number) => {
  validateSalary(basePay);
  return basePay * 0.02;
}
