import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { AdminContentType, AdminSection } from "@/lib/admin-content";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllAdminContent } from "@/lib/admin-db";
import { addAdminContentAction, deleteAdminContentAction, loginAdmin, logoutAdmin } from "@/app/neverbeforedicoverableadminpage/actions";

export const dynamic = "force-dynamic";

const sections: AdminSection[] = ["marketing", "video", "web", "web3"];
const contentTypes: AdminContentType[] = ["video", "website", "custom"];

const getFeedback = (error?: string, success?: string) => {
  if (error === "invalid-password") {
    return { tone: "error", text: "Incorrect password." };
  }

  if (error === "invalid-input") {
    return { tone: "error", text: "Title, description, and either a URL or uploaded file are required." };
  }

  if (success === "created") {
    return { tone: "success", text: "Content added successfully." };
  }

  if (success === "deleted") {
    return { tone: "success", text: "Content removed." };
  }

  return null;
};

export default async function NeverBeforeDiscoverableAdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; success?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const isAuthed = await isAdminAuthenticated();
  const feedback = getFeedback(params.error, params.success);
  const items = isAuthed ? getAllAdminContent() : [];

  if (!isAuthed) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 py-10">
          <Card className="w-full max-w-md bg-card/60 border-border">
            <CardHeader>
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>Enter password to manage private content.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={loginAdmin} className="space-y-4">
                <Input type="password" name="password" placeholder="Password" required />
                {feedback ? (
                  <p className={feedback.tone === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
                    {feedback.text}
                  </p>
                ) : null}
                <Button type="submit" className="w-full">Unlock</Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow py-12">
        <section className="w-full max-w-5xl mx-auto px-4 md:px-6 space-y-8">
          <Card className="bg-card/60 border-border">
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <CardTitle>Secret Admin Panel</CardTitle>
                <CardDescription>Add content to Marketing, Video, Web, and Web3 sections.</CardDescription>
              </div>
              <form action={logoutAdmin}>
                <Button type="submit" variant="outline">Log Out</Button>
              </form>
            </CardHeader>
            <CardContent>
              <form action={addAdminContentAction} className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="section" className="text-sm text-muted-foreground">Section</label>
                  <select
                    id="section"
                    name="section"
                    defaultValue="marketing"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {sections.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm text-muted-foreground">Content Type</label>
                  <select
                    id="type"
                    name="type"
                    defaultValue="video"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {contentTypes.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="title" className="text-sm text-muted-foreground">Title</label>
                  <Input id="title" name="title" required />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="description" className="text-sm text-muted-foreground">Description</label>
                  <Textarea id="description" name="description" rows={4} required />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="url" className="text-sm text-muted-foreground">URL or ScreenPal ID</label>
                  <Input id="url" name="url" placeholder="Use this for websites, embeds, or ScreenPal IDs" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="file" className="text-sm text-muted-foreground">Upload File (optional)</label>
                  <Input id="file" name="file" type="file" accept="video/*,image/*" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="thumbnailUrl" className="text-sm text-muted-foreground">Thumbnail URL (optional)</label>
                  <Input id="thumbnailUrl" name="thumbnailUrl" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="tags" className="text-sm text-muted-foreground">Tags, comma-separated (optional)</label>
                  <Input id="tags" name="tags" />
                </div>

                <div className="md:col-span-2 flex items-center gap-3">
                  <Button type="submit">Add Content</Button>
                  {feedback ? (
                    <p className={feedback.tone === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
                      {feedback.text}
                    </p>
                  ) : null}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle>Existing Content</CardTitle>
              <CardDescription>All saved entries are stored in the app database.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">No admin content yet.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="rounded-lg border border-border p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.section} • {item.type}</p>
                      <p className="text-sm text-muted-foreground break-all">{item.url}</p>
                    </div>
                    <form action={deleteAdminContentAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <Button variant="destructive" type="submit">Delete</Button>
                    </form>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
