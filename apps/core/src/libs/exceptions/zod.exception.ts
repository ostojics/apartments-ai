//  [
//   {
//     "expected": "string",
//     "code": "invalid_type",
//     "path": [
//       "phoneNumber"
//     ],
//     "message": "Invalid input: expected string, received object"
//   }
// ]

export interface ZodErrorEntry {
  expected: string;
  code: string;
  path: string[];
  message: string;
}

export class ZodException extends Error {
  constructor(
    message: string,
    public readonly errors: ZodErrorEntry[],
  ) {
    super(message);
    this.errors = errors;
  }
}
