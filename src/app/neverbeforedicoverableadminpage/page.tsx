import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllAdminContent } from "@/lib/admin-db";
import { loginAdmin, logoutAdmin, deleteAdminContentAction } from "@/app/neverbeforedicoverableadminpage/actions";
import { AdminContentForm } from "@/components/admin-content-form";

export const dynamic = "force-dynamic";

const getFeedback = (error?: string, success?: string) => {
  if (error === "invalid-password") {
    return { tone: "error" as const, text: "Incorrect password." };
  }

  if (error === "invalid-input") {
    return { tone: "error" as const, text: "Title, description, and either a URL or uploaded file are required." };
  }

  if (success === "created") {
    return { tone: "success" as const, text: "Content added successfully." };
  }

  if (success === "deleted") {
    return { tone: "success" as const, text: "Content removed." };
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
                <CardDescription>Add content to all sections and manage blog posts.</CardDescription>
              </div>
              <form action={logoutAdmin}>
                <Button type="submit" variant="outline">Log Out</Button>
              </form>
            </CardHeader>
          </Card>

          <AdminContentForm initialFeedback={feedback} />

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
