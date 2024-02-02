import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientsModuleAsyncOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';

export const getGrpcOptions = (
  configService: ConfigService,
  packageName: string,
  protoPath: string,
): GrpcOptions => ({
  transport: Transport.GRPC,
  options: {
    url: configService.get('GRPC_SERVER_URL'),
    package: packageName,
    protoPath,
    loader: {
      keepCase: true,
    },
  },
});

export const GrpcClientModuleOptions = (
  name: string,
  packageName: string,
  protoPath: string,
): ClientsModuleAsyncOptions => [
  {
    name,
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) =>
      getGrpcOptions(configService, packageName, protoPath),
    inject: [ConfigService],
  },
];
