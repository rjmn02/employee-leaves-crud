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
  }else if (basePay < SALARY_START) {
    return contributions[0];
  }
}

export const computePhilHealth = (basePay: number) => {
  validateSalary(basePay);
  return basePay * 0.05;
}

export const computePagIbig = (basePay: number) => {
  validateSalary(basePay);
  return basePay * 0.02;
}
export const computeWithholdingTax = (basePay: number, payrollPeriod: number) => {
  validateSalary(basePay);

  const getWithholdingTax = (basePay: number, salaryRanges: { LOWER_RANGE: number, UPPER_RANGE: number, TAX_RATE: number, FIXED_AMMOUNT: number }[]) => {
    for (let salaryRange of salaryRanges) {
      if (basePay >= salaryRange.LOWER_RANGE && basePay <= salaryRange.UPPER_RANGE) {
        return salaryRange.FIXED_AMMOUNT + (basePay - salaryRange.LOWER_RANGE) * salaryRange.TAX_RATE;
      }
    }
    return 0;
  }

  const monthlySalaryRanges = [
    { LOWER_RANGE: 0, UPPER_RANGE: 20832, TAX_RATE: 0, FIXED_AMMOUNT: 0 },
    { LOWER_RANGE: 20833, UPPER_RANGE: 33332, TAX_RATE: 0.15, FIXED_AMMOUNT: 0 },
    { LOWER_RANGE: 33333, UPPER_RANGE: 66666, TAX_RATE: 0.20, FIXED_AMMOUNT: 1875 },
    { LOWER_RANGE: 66667, UPPER_RANGE: 166666, TAX_RATE: 0.25, FIXED_AMMOUNT: 8541.80 },
    { LOWER_RANGE: 166667, UPPER_RANGE: 666666, TAX_RATE: 0.30, FIXED_AMMOUNT: 33541.80 },
    { LOWER_RANGE: 666667, UPPER_RANGE: Number.MAX_VALUE, TAX_RATE: 0.35, FIXED_AMMOUNT:  183541.80},
  ];

  const semiMonthlySalaryRanges = [
    { LOWER_RANGE: 0, UPPER_RANGE: 10416, TAX_RATE: 0, FIXED_AMMOUNT: 0 },
    { LOWER_RANGE: 10417, UPPER_RANGE: 16666, TAX_RATE: 0.15, FIXED_AMMOUNT: 0 },
    { LOWER_RANGE: 16667, UPPER_RANGE: 33332, TAX_RATE: 0.20, FIXED_AMMOUNT: 937.50 },
    { LOWER_RANGE: 33333, UPPER_RANGE: 83332, TAX_RATE: 0.25, FIXED_AMMOUNT: 4270.70 },
    { LOWER_RANGE: 83333, UPPER_RANGE: 333332, TAX_RATE: 0.30, FIXED_AMMOUNT: 16770.70 },
    { LOWER_RANGE: 333332, UPPER_RANGE: Number.MAX_VALUE, TAX_RATE: 0.35, FIXED_AMMOUNT:  91770.70},
  ];

  return payrollPeriod === 1 ? getWithholdingTax(basePay, semiMonthlySalaryRanges) : getWithholdingTax(basePay, monthlySalaryRanges);
}

export const computeNetPay = 
({basePay, totalDeduction, totalBonus, governmentContribution}: 
  {basePay: number, totalDeduction: number, totalBonus: number,governmentContribution: number}): number => {
  return basePay - totalDeduction + totalBonus - governmentContribution;
}