import {
  ArgumentMetadata,
  Injectable,
  Paramtype,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';
import { DTO_VALIDATION_OPTIONS } from '../constants';
import * as merge from 'deepmerge';
import { isObject, omit } from 'lodash';

@Injectable()
export class AppValidationPipe extends ValidationPipe implements PipeTransform {
  // constructor(val) {
  //   console.log('val', val);
  //   super(val);
  // }

  /**
   *
   * @param value 请求携带的数据
   * @param metadata {type: 请求体类型 'body' | 'query' | 'param' | 'custom' | 'custom';
   *  metatype: dto实例}
   */
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value, metadata);
    // 获取dto实例，请求体类型
    const { metatype, type } = metadata;
    const dto = metatype as any;
    // 获取dto上的装饰器配置
    const options = Reflect.getMetadata(DTO_VALIDATION_OPTIONS, dto);
    // 如果没有配置，直接返回
    if (!options) {
      return super.transform(value, metadata);
    }
    // 获取原始的配置
    const originOptions = { ...this.validatorOptions };
    const originTransformOptions = { ...this.transformOptions };
    console.log('options', type, options, originOptions);
    // 自定义配置解构出来
    const { transformOptions, type: optionsType, ...customOptions } = options;
    // 根据DTO类上设置的type来设置当前的DTO请求类型,默认为'body'
    const requestType: Paramtype = optionsType ?? 'body';
    // 如果当前请求类型和DTO上设置的请求类型不一致，直接返回
    if (requestType !== type) {
      return value;
    }

    // 合并当前transform选项和自定义选项
    // merge.arrayMerge是一个函数，用于合并数组，这里的作用是直接返回sourceArray，即直接使用自定义配置，不使用默认配置
    if (transformOptions) {
      this.transformOptions =
        merge(this.transformOptions, transformOptions ?? {}, {
          arrayMerge: (destinationArray, sourceArray) => sourceArray,
        }) ?? {};
    }
    console.log('this.transformOptions', this.transformOptions);
    console.log('this.validatorOptions', this.validatorOptions, customOptions);
    // 合并当前验证选项和自定义选项
    this.validatorOptions = merge(this.validatorOptions, customOptions ?? {}, {
      arrayMerge: (destinationArray, sourceArray) => sourceArray,
    });

    // console.log(111111, this.validatorOptions);
    // 因为上传文件时,文件对象中的fields属性是一个对象,这个对象中包含了文件的其他信息,例如文件名,文件大小等
    const toValidate = isObject(value)
      ? Object.fromEntries(
          Object.entries(value as Record<string, any>).map(([key, v]) => {
            if (!isObject(v) || !('mimetype' in v)) {
              return [key, v];
            }
            return [key, omit(v, 'fields')];
          }),
        )
      : value;

    console.log('toValidate', toValidate);
    // 调用父类的transform方法
    let result = await super.transform(toValidate, metadata);
    console.log('result', result);

    // 如果dto类的中存在transform静态方法,则返回调用进一步transform之后的结果
    if (typeof result.transform === 'function') {
      result = await result.transform(result);
      const { transform, ...data } = result;
      result = data;
    }

    // 恢复原始配置
    this.validatorOptions = originOptions;
    //重置transformOptions
    this.transformOptions = originTransformOptions;

    return result;
  }
}
