import { Paramtype, SetMetadata } from '@nestjs/common';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { DTO_VALIDATION_OPTIONS } from '../constants';

/**
 * 用于配置通过全局验证管道数据的 DTO 类装饰器
 * @param options
 */
export const DtoValidation = (
  options?: ValidatorOptions & { transformOptions?: ClassTransformOptions } & {
    type?: Paramtype;
  },
) => {
  return (target: any) => {
    console.log('options', target, options);
    const newTarget = SetMetadata(DTO_VALIDATION_OPTIONS, options)(target);

    console.log(
      'newTarget',
      Reflect.getMetadata(DTO_VALIDATION_OPTIONS, newTarget),
    );
    console.log('target', Reflect.getMetadata(DTO_VALIDATION_OPTIONS, target));

    //log
    //newTarget { groups: [ 'create' ] }
    //target { groups: [ 'create' ] }
    return newTarget;
  };
};
