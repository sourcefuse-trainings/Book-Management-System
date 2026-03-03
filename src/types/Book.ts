import type { BookBasicInfo } from "./BookBasicInfo.js";
import type { BookAuthorInfo } from "./BookAuthorInfo.js";
import type { BookPricing } from "./BookPricing.js";

export interface Book extends BookBasicInfo, BookAuthorInfo, BookPricing {}