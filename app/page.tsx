"use client";

import ShareComp from "@/components/share-component";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { useForm } from "react-hook-form";
import z from "zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";

function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

const ShareCode = `export const ShareComp = ({ link }: ShareProps) => {
  new ClipboardJS(".copy");
  
  return (
    <div className="border border-gray-500 rounded-lg w-96 ">
      <div className="flex justify-between items-center border-b border-gray-500 px-4 py-2">
        <h1 className="text-lg font-semibold">Share</h1>
        <Share2 className="w-5 h-5" />
      </div>
      <div className="px-4 py-6 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={link}
              readOnly
              className="text-text"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="p-4 copy"
            data-clipboard-action="copy"
            data-clipboard-target="#link"
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <FacebookShare url={link!} size={48} borderRadius={10} />
          <WhatsappShare url={link!} size={48} borderRadius={10} />
          <TwitterShare url={link!} size={48} borderRadius={10} />
          <EmailShare url={link!} size={48} borderRadius={10} />
        </div>
      </div>
    </div>
  );
};`;

const ImportCode = `import { CopyIcon, Share2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
EmailShare,
FacebookShare,
TwitterShare,
WhatsappShare,
} from "react-share-kit";
import ClipboardJS from "clipboard";`;

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const formSchema = z.object({
    code: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: false,
    },
  });

  const [code, setCode] = useState(form.getValues("code"));

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setCode(data.code);
  };
  if (isDesktop) {
    return (
      <main className="flex flex-col justify-center items-center px-4 md:px-28 lg:px-44 py-20">
        <div className="relative flex flex-col justify-center items-center max-w-2xl">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
            Shadcn Share Modal
          </h1>
          <p className="text-base md:text-lg text-center opacity-80 font-normal mt-2">
            Beautifully designed, customizable share modal for web built on top
            of shadcn-ui and tailwind-css using react-share!
          </p>
          <div className="flex items-center gap-x-4 mt-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Live Demo</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] py-10">
                <ShareComp link="https://atmajo.tech" />
              </DialogContent>
            </Dialog>
            <Link href="https://github.com/atmajo/shadcn-share-modal">
              <Button variant="secondary">Code</Button>
            </Link>
          </div>
        </div>
        <div className="mt-14">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex items-center mb-2">
                      <FormLabel className="pt-2">Code</FormLabel>
                      <FormControl>
                        <Button variant="ghost" className="hover:bg-none">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </Button>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          {!code && <ShareComp link="https://atmajo.tech" />}
          {code && (
            <div className="flex flex-col justify-center gap-y-5">
              <pre
                className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900"
                data-language="bash"
                data-theme="default"
              >
                <code
                  className="relative flex justify-between rounded bg-muted px-2 py-[0.2rem] font-mono text-sm"
                  data-language="bash"
                  data-theme="default"
                >
                  <input
                    className="line bg-transparent text-white w-full border-none outline-none"
                    defaultValue="npm i react-share-kit clipboard"
                    readOnly
                  />
                </code>
              </pre>
              <CodeBlock
                text={ImportCode}
                language="tsx"
                showLineNumbers={true}
                theme={dracula}
              />
              <CodeBlock
                text={ShareCode}
                language="tsx"
                showLineNumbers={true}
                theme={dracula}
              />
            </div>
          )}
        </div>
        <div className="relative flex flex-col justify-center items-end max-w-2xl">
          <p className="text-sm text-center opacity-80 font-normal mt-32">
            Built by{" "}
            <Link href="https://github.com/atmajo">
              <span className="underline">Atmajo!</span>
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center px-4 md:px-28 lg:px-44 py-20">
      <div className="relative flex flex-col justify-center items-center max-w-2xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
          Shadcn Share Modal
        </h1>
        <p className="text-base md:text-lg text-center opacity-80 font-normal mt-2">
          Beautifully designed, customizable share modal for web built on top of
          shadcn-ui and tailwind-css using react-share!
        </p>
        <div className="flex items-center gap-x-4 mt-10">
          <Drawer>
            <DrawerTrigger asChild>
              <Button>Live Demo</Button>
            </DrawerTrigger>
            <DrawerContent className="pl-5 py-10">
              <ShareComp link="https://atmajo.tech" />
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <Link href="https://github.com/atmajo/shadcn-share-modal">
            <Button variant="secondary">Code</Button>
          </Link>
        </div>
      </div>
      <div className="mt-14">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex items-center mb-2">
                    <FormLabel className="pt-2">Code</FormLabel>
                    <FormControl>
                      <Button variant="ghost" className="hover:bg-none">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </Button>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        {!code && <ShareComp link="https://atmajo.tech" />}
        {code && (
          <div className="flex flex-col justify-center gap-y-5">
            <pre
              className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900"
              data-language="bash"
              data-theme="default"
            >
              <code
                className="relative flex justify-between rounded bg-muted px-2 py-[0.2rem] font-mono text-sm"
                data-language="bash"
                data-theme="default"
              >
                <input
                  className="line bg-transparent text-white w-full border-none outline-none"
                  defaultValue="npm i react-share-kit clipboard"
                  readOnly
                />
              </code>
            </pre>
            <CodeBlock
              text={ImportCode}
              language="tsx"
              showLineNumbers={true}
              theme={dracula}
            />
            <CodeBlock
              text={ShareCode}
              language="tsx"
              showLineNumbers={true}
              theme={dracula}
            />
          </div>
        )}
      </div>
      <div className="relative flex flex-col justify-center items-end max-w-2xl">
        <p className="text-sm text-center opacity-80 font-normal mt-32">
          Built by{" "}
          <Link href="https://github.com/atmajo">
            <span className="underline">Atmajo!</span>
          </Link>
        </p>
      </div>
    </main>
  );
}
