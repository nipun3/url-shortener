import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientsModuleAsyncOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';

/**
 * returns grpc module options
 * 
 * @param configService - config service
 * @param packageName - grpc service proto package name
 * @param protoPath - proto file path
 * @returns {GrpcOptions}
 */
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

/**
 * return client grpc options
 * 
 * @param name - provider name
 * @param packageName - grpc service proto package name
 * @param protoPath - proto file path
 * @returns {ClientsModuleAsyncOptions}
 */
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
