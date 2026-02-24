import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { NavBar } from '../../commons/components/navBar/NavBar';
import { TopHeader } from '../../commons/components/header/TopHeader';
import { PageLayout } from '../../commons/components/layout/PageLayout';
import { FloatingInput } from '../../commons/components/FloatingInput';
import { useAuth } from '../../commons/hooks/useAuth';
import { useSnackbar } from '../../commons/hooks/useSnackbar';
import { ConfirmModal } from '../../commons/components/ConfirmModal';


const userSchema = z.object({

    name: z.string().min(1, 'Campo Obrigatório').max(30, 'Máx. 30 Caracteres'),
    enrollment: z.string().min(4, 'Min. 4 Letras').max(10, 'Máx. 10 Caracteres'),
    email: z.string().email('E-mail inválido').min(1, 'Campo Obrigatório').max(40, 'Máx. 40 Caracteres'),
    password: z.string().min(1, 'Campo Obrigatório'),
    confirmPassword: z.string().min(1, 'Campo Obrigatório'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type UserFormData = z.infer<typeof userSchema>;

export const UserForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { users, addUser, updateUser } = useAuth();
    const { showSnack } = useSnackbar();
    const [open, setOpen] = React.useState(true);
    const [isCancelModalOpen, setIsCancelModalOpen] = React.useState(false);

    const isEdit = !!id;
    const userToEdit = isEdit ? users.find(u => u.id === Number(id)) : null;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormData>({

        resolver: zodResolver(userSchema),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (userToEdit) {
            reset({
                name: userToEdit.name,
                enrollment: userToEdit.enrollment,
                email: userToEdit.email,
                password: '',
                confirmPassword: '',
            });
        }
    }, [userToEdit, reset]);

    const onSubmit = (data: UserFormData) => {
        const duration = 1500;
        if (isEdit && userToEdit) {
            updateUser(userToEdit.id, {
                name: data.name,
                enrollment: data.enrollment,
                email: data.email,
            });
            showSnack('Dados salvos com sucesso!', 'success', duration);
        } else {
            addUser({
                name: data.name,
                enrollment: data.enrollment,
                email: data.email,
            });
            showSnack('Cadastro Realizado!', 'success', duration);
        }

        setTimeout(() => {
            navigate('/users');
        }, duration);
    };

    const handleCancel = () => {
        setIsCancelModalOpen(true);
    };

    const confirmCancel = () => {
        setIsCancelModalOpen(false);
        const duration = 1500;
        showSnack('Cadastro cancelado', 'warning', duration);
        setTimeout(() => {
            navigate('/users');
        }, duration);
    };

    return (
        <div className="flex min-h-screen bg-background font-sans">
            <NavBar open={open} setOpen={setOpen} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <TopHeader />

                <div className="px-8 pt-4">
                    <div className="flex items-center gap-2 text-[12px] font-medium text-main-green-300">
                        <Link to="/users" className="hover:underline">Usuários</Link>
                        <span>&gt;</span>
                        <span className="opacity-60">{isEdit ? 'Editar Usuário' : 'Cadastro de Usuário'}</span>
                    </div>
                </div>

                <PageLayout title={
                    <div className="flex items-center">
                        <button onClick={() => navigate('/users')} className="hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                            <ChevronLeft size={32} />
                        </button>
                        <h1 className="text-4xl font-bold text-main-green-300">
                            {isEdit ? 'Editar Usuário' : 'Cadastro de Usuário'}
                        </h1>
                    </div>
                }>
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-premium border border-[#86868620] p-10 mt-4 w-full">
                        <div className="space-y-12">
                            <section>
                                <div className="flex items-center gap-[14px] mb-10">
                                    <span className="text-[14px] font-bold text-main-green-300 whitespace-nowrap uppercase tracking-wider">Dados do Usuário</span>
                                    <div className="h-px bg-[#70707040] w-full" />
                                </div>

                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                    <FloatingInput
                                        label="Nome Completo"
                                        hint="Máx. 30 Caracteres"
                                        error={errors.name?.message}
                                        {...register('name')}
                                    />
                                    <FloatingInput
                                        label="Matrícula"
                                        hint="Min. 4 Letras • Máx. 10 Caracteres"
                                        error={errors.enrollment?.message}
                                        {...register('enrollment')}
                                    />
                                    <div className="col-span-1">
                                        <FloatingInput
                                            label="E-mail"
                                            hint="Máx. 40 Caracteres"
                                            error={errors.email?.message}
                                            {...register('email')}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-[14px] mb-10">
                                    <span className="text-[14px] font-bold text-main-green-300 whitespace-nowrap uppercase tracking-wider">Dados de acesso</span>
                                    <div className="h-px bg-[#70707040] w-full" />
                                </div>

                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                    <FloatingInput
                                        label="Senha"
                                        type="password"
                                        error={errors.password?.message}
                                        {...register('password')}
                                    />
                                    <FloatingInput
                                        label="Repetir Senha"
                                        type="password"
                                        error={errors.confirmPassword?.message}
                                        {...register('confirmPassword')}
                                    />
                                </div>
                            </section>
                        </div>

                        <div className="mt-16 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="w-[185px] h-[55px] border border-main-green-300 rounded-lg text-main-green-300 font-bold hover:bg-main-green-300/5 transition-colors text-lg flex items-center justify-center cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="w-[185px] h-[55px] bg-main-cyan-200 text-white shadow-lg hover:bg-main-cyan-100 rounded-lg font-bold transition-all text-lg flex items-center justify-center cursor-pointer"
                            >
                                {isEdit ? 'Salvar' : 'Cadastrar'}
                            </button>
                        </div>
                    </form>
                </PageLayout>

                <ConfirmModal
                    isOpen={isCancelModalOpen}
                    onClose={() => setIsCancelModalOpen(false)}
                    onConfirm={confirmCancel}
                    title="Deseja cancelar?"
                    description="Os dados inseridos não serão salvos"
                />
            </div>
        </div>
    );
};
