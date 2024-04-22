# Machine Vision Frontend Assignment

## Overview
This assignment involves starting with a blank page and adding a table that makes calls to the Provided API. Your goal is to dynamically populate this table with data fetched from the API, showcasing your ability to work with React components, API calls, and modern frontend development practices.

## Instructions

1. **Use Available Components:** You are expected to utilize the existing components in the project for building your solution.
2. **API Calls with TanStack Query:** Make your API calls to the provided API using TanStack Query for efficient data fetching and state management.
3. **Provided API:** The API you will be using for this project is available at [Machine Vision Datacore](http://datacore-dev.machinevision.global/).
4. **Endpoint:** You should use `/items/perusahaan_bei` to complete this assessment
5. **Authorization:** You can obtain `access_token` by running storybook, go to Auth component, and logging in with the following credentials:
```text
Email       :   johndoe@mail.com
Password    :   12345678
```
6. **Objectives:** Use provided Table component to list all data from mentioned endpoint.
7. **Atomic Commits:** Your commits should be atomic and follow the conventional commit format as outlined at [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
8. **Submission:** Once you have completed the assignment, archive the source code and send back to us to muhammad.r@machinevision.global and CC to devvara.r@machinevision.global

## Technology Stack

The project utilizes the following technologies, but you are not limited to these alone:

- **Next.js 13:** A React framework that enables functionality such as server-side rendering and generating static websites. For more information, visit [Next.js Official Site](https://nextjs.org).
- **TypeScript:** A superset of JavaScript that adds static types. Learn more at [TypeScript's Official Site](https://www.typescriptlang.org).
- **MaterialUI:** A popular React UI framework for designing visually appealing and responsive components. Get started at [MaterialUI's Website](https://mui.com/material-ui/getting-started).
- **TanStack Query:** A powerful library for handling server-state in React applications. Detailed documentation can be found at [TanStack Query](https://tanstack.com/query/latest).
- **Storybook:** A tool for UI development that makes it easy to visualize different states of your UI components. Check it out at [Storybook's Website](https://storybook.js.org).

### HTTP Request `/items/perusahaan_bei`
Request
```shell
curl --request GET \
  --url 'http://datacore-dev.machinevision.global/items/perusahaan_bei?fields=id%2Ckode_saham%2Cnama%2Csektor_id.nama%2Ctanggal_listing' \
  --header 'Authorization: Bearer 7xkaCaJ2oRWXEO0r-bJtjTySKLqm0Bpn'
```

Response
```json
{
  "data": [
    {
      "id": "08f32277-71ac-47f5-b68c-b773a5b0fc77",
      "kode_saham": "ASII",
      "nama": "PT Astra International Tbk",
      "tanggal_listing": "1990-04-04",
      "sektor_id": {
        "nama": "Diversifikasi"
      }
    },
    {
      "id": "681a288e-f6f5-4789-bf41-e7366df88253",
      "kode_saham": "BBCA",
      "nama": "PT Bank Central Asia Tbk",
      "tanggal_listing": "2000-05-31",
      "sektor_id": {
        "nama": "Keuangan"
      }
    },
    {
      "id": "99fbf104-30e6-4d0f-91d4-3f5cff2e69ee",
      "kode_saham": "TLKM",
      "nama": "PT Telekomunikasi Indonesia Tbk",
      "tanggal_listing": "1995-11-14",
      "sektor_id": {
        "nama": "Telekomunikasi"
      }
    },
    {
      "id": "bf1298e2-bd05-49f0-9248-3f7402ed85f1",
      "kode_saham": "UNVR",
      "nama": "PT Unilever Indonesia Tbk",
      "tanggal_listing": "1982-12-11",
      "sektor_id": {
        "nama": "Konsumen Barang"
      }
    },
    {
      "id": "d82fae84-f607-430f-a1a7-b6da9bc3c633",
      "kode_saham": "INDF",
      "nama": "PT Indofood Sukses Makmur Tbk",
      "tanggal_listing": "1994-07-14",
      "sektor_id": {
        "nama": "Makanan & Minuman"
      }
    }
  ]
}
```

Good luck with your assignment! We look forward to seeing your innovative solutions and your approach to tackling frontend challenges.
