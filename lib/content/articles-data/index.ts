import type { ArticleInput } from "../articles";
import { ADDICTION_ARTICLES } from "./addiction";
import { ANXIETY_ARTICLES } from "./anxiety";
import { AWARENESS_ARTICLES } from "./awareness";
import { CHILD_ARTICLES } from "./child";
import { DEPRESSION_ARTICLES } from "./depression";
import { FESTIVAL_ADDICTION_ARTICLES, FESTIVAL_AWARENESS_ARTICLES } from "./festival";
import { GERIATRIC_ARTICLES } from "./geriatric";
import { SEXUAL_ARTICLES } from "./sexual";
import { SLEEP_ARTICLES } from "./sleep";
import { STUDENT_ARTICLES } from "./student";
import { THERAPY_ARTICLES } from "./therapy";

/** Structured article batches (added in groups by category). */
export const ARTICLE_BATCHES: ArticleInput[][] = [DEPRESSION_ARTICLES, ANXIETY_ARTICLES, ADDICTION_ARTICLES, SEXUAL_ARTICLES, CHILD_ARTICLES, SLEEP_ARTICLES, THERAPY_ARTICLES, STUDENT_ARTICLES, GERIATRIC_ARTICLES, AWARENESS_ARTICLES, FESTIVAL_ADDICTION_ARTICLES, FESTIVAL_AWARENESS_ARTICLES];
