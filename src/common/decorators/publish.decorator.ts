import { SetMetadata } from '@nestjs/common';

export const Publish = () => SetMetadata('isPublish', true);
