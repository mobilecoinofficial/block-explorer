import makeRARequest from "api/makeRARequest";
import { CountersResponse } from "api/types";
import camelCaseObjectKeys from "utils/camelize";

export default async function getCounters(): Promise<CountersResponse> {
    const { result } = await makeRARequest<CountersResponse>({
        route: `counters`
    });

    return camelCaseObjectKeys(result);
}
