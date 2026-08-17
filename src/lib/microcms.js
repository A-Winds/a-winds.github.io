import { createClient } from "microcms-js-sdk";

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;
const informationEndpoint = import.meta.env.MICROCMS_INFORMATION_ENDPOINT;
const concertsEndpoint = import.meta.env.MICROCMS_CONCERTS_ENDPOINT;
const membersEndpoint = import.meta.env.MICROCMS_MEMBERS_ENDPOINT;

if (!serviceDomain) {
  throw new Error("MICROCMS_SERVICE_DOMAINが設定されていません");
}

if (!apiKey) {
  throw new Error("MICROCMS_API_KEYが設定されていません");
}

export const microcmsClient = createClient({
  serviceDomain,
  apiKey,
});

/**
 * dateの新しい順に、お知らせを指定件数取得
 */
export async function getLatestInformation(limit = 6) {
  const response = await microcmsClient.getList({
    endpoint: informationEndpoint,
    queries: {
      limit,
      orders: "-date",
    },
  });

  return response.contents;
}

/**
 * お知らせページのページごとに表示するカード数
 */
export const INFORMATION_PAGE_SIZE = 9;

/**
 * dateの新しい順に、お知らせを指定ページ分取得
 */
export async function getInformationPage(page = 1) {
  return microcmsClient.getList({
    endpoint: informationEndpoint,
    queries: {
      limit: INFORMATION_PAGE_SIZE,
      offset: (page - 1) * INFORMATION_PAGE_SIZE,
      orders: "-date",
    },
  });
}

/**
 * ensokaiから日付が最も新しい演奏会を1件取得
 */
export async function getLatestConcert() {
  const response = await microcmsClient.getList({
    endpoint: concertsEndpoint,
    queries: {
      limit: 1,
      orders: "-date,-publishedAt",
    },
  });

  return response.contents[0];
}

/**
 * ensokaiから日付の新しい順に演奏会を取得
 */
export const getMembers = async () => {
  const response = await microcmsClient.getList({
    endpoint: membersEndpoint,
    queries: {
      limit: 100,
      orders: "system:default",
    },
  });

  return response.contents;
};

/**
 * ensokaiからコンクールのデータだけを取得
 */
export const getCompetitions = async () => {
  const response = await microcmsClient.getList({
    endpoint: "ensokai",
    queries: {
      limit: 100,
      filters: "competition[equals]true",
      orders: "-date",
    },
  });

  return response.contents;
};
