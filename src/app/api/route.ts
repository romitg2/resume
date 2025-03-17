import { NextResponse} from "next/server";
export function GET() {
    return new NextResponse("Hello World!", {status: 200});
}
