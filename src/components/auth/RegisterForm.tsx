"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const registerSchema = z.object({
    email: z.email("email is required"),
    password: z.string().min(8, "Minimum 8 characters required"),
    password2: z.string()
}).refine((data) => data.password === data.password2, {
    message: "passwords don't match",
    path: ["password2"]
})

type TRegisterForm = z.infer<typeof registerSchema>

export default function RegisterForm() {
    const router = useRouter()
    const form = useForm<TRegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            password2: ""
        }
    })

    const onSubmit = async (values: TRegisterForm) => {
        await authClient.signUp.email({
            name: values.email,
            email: values.email,
            password: values.password,
            callbackURL: "/",
        }, {
            onSuccess: () => {
                router.push("/")
            },
            onError: (ctx) => {
                toast.error(ctx.error.message)
            }
        }
        )
    }
    const isPending = form.formState.isSubmitting

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="max-w-3xl w-full">
                <CardHeader className="text-center">

                    <CardTitle>Welcome</CardTitle>
                    <CardDescription>Register your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">

                                <div className="flex flex-col gap-2">
                                    <Button variant="outline" className="w-full" type="button" disabled={isPending}>Login with Google</Button>
                                    <Button variant="outline" className="w-full" type="button" disabled={isPending}>Login with GitHub</Button>
                                </div>

                                <div className="grid gap-6">
                                    <FormField name="email"
                                        control={form.control}
                                        render={({ field }) =>
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="example@gmail.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>}
                                    />
                                    <FormField name="password"
                                        control={form.control}
                                        render={({ field }) =>
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password2"
                                        render={({ field }) =>
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••"  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }
                                    />
                                    <Button type="submit" disabled={isPending}>
                                        Get Started
                                    </Button>
                                    <div className="text-center">
                                        Already have an account?{" "}
                                        <Link href={"/login"} className="underline underline-offset-4">
                                            Login
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
