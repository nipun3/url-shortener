import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModuleAsyncOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const GrpcClientModuleOptions = (protoPath: string): ClientsModuleAsyncOptions => [
    {
        name: 'LINK_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
                url: configService.get('GRPC_SERVER_URL'),
                package: 'urlService',
                protoPath,
                loader: {
                    keepCase: true,
                },
            },
        }),
        inject: [ConfigService],
    }
];
