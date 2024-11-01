"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = exports.updatePostInput = exports.createPostInput = exports.signInInput = exports.signUpInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpInput = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
    name: zod_1.default.string().optional()
});
exports.signInInput = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
});
exports.createPostInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.updatePostInput = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
});
exports.Blog = zod_1.default.object({
    id: zod_1.default.string(), // or number, depending on your API
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    name: zod_1.default.string(),
    date: zod_1.default.string(),
    tags: zod_1.default.array(zod_1.default.string())
});
