import path from "path";
import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import Dotenv from "dotenv-webpack";
// needed for historyApiFallback
import * as webpackDevServer from "webpack-dev-server";
import EnvVarChecker from "./envVarChecker";

const webpackConfig = (env): Configuration => {
    const plugins: any[] = [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./src/assets/favicon.ico"
        }),
        new ForkTsCheckerWebpackPlugin(),
        new ESLintPlugin({ files: "./src/**/*.{ts,tsx,js,jsx}" })
    ];

    // allow use of .env file in development
    if (env.development) {
        plugins.push(
            new Dotenv({
                systemvars: true
            })
        );
        // expect variables to be set in env for production builds
    } else {
        plugins.push(
            new webpack.EnvironmentPlugin(["FULL_SERVICE_URL", "RESERVE_AUDITOR_URL", "MC_NETWORK"])
        );
    }

    return {
        entry: "./src/index.tsx",
        ...(env.production ? {} : { devtool: "eval-source-map" }),
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            plugins: [new TsconfigPathsPlugin()]
        },
        output: {
            path: path.join(__dirname, "/dist"),
            filename: "build.js",
            publicPath: "/"
        },
        devServer: {
            historyApiFallback: true
        },
        performance: {
            maxEntrypointSize: 1536000,
            maxAssetSize: 1536000
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    },
                    exclude: /dist/
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource"
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"]
                }
            ]
        },
        plugins
    };
};

export default webpackConfig;
