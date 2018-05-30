import { IDictionary } from '../model.header';

export interface IValidationError<TProps extends IDictionary> extends Error {
  modelName: string;
  errors: Partial<{ [key in keyof TProps]: Array<string> }>;
}

export class ValidationError<TProps extends IDictionary> extends Error
  implements IValidationError<TProps> {
  public readonly errors: IValidationError<TProps>['errors'];
  public readonly modelName: string;

  constructor(
    errors: IValidationError<TProps>['errors'],
    modelName: string,
    errorMessage: string = 'Validation failed. See .errors on this Error or the Nohm model instance for details.',
  ) {
    super(errorMessage);
    const emptyErrors: IValidationError<TProps>['errors'] = {};
    this.modelName = modelName;
    this.errors = Object.keys(errors).reduce<
      IValidationError<TProps>['errors']
    >((obj, key) => {
      const error = errors[key];
      if (error && error.length > 0) {
        obj[key] = error;
      }
      return obj;
    }, emptyErrors);
  }
}
