import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { type FormEventHandler, type ReactNode, useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Event Management',
        href: '/events',
    },
];

type Event = {
    id: number;
    name: string;
    description: string;
    start_time: string;
    end_time: string;
    location: string;
    user_id: number;
};

type PaginatedEvents = {
    data: Event[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
};

interface EventPageProps extends SharedData {
    events: PaginatedEvents;
    filters: { search?: string };
    current: { name?: string };
    flash?: {
        success?: string;
    };
}

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};

const formatForInput = (dateString?: string): string => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
            date.getHours(),
        )}:${pad(date.getMinutes())}`;
    } catch (e) {
        return '';
    }
};

function EventFormModal({
    isOpen,
    onClose,
    event,
}: {
    isOpen: boolean;
    onClose: () => void;
    event: Event | null;
}) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            setData({
                name: event?.name || '',
                description: event?.description || '',
                start_time: formatForInput(event?.start_time),
                end_time: formatForInput(event?.end_time),
                location: event?.location || '',
            });
        }
    }, [isOpen, event]);

    const submit: FormEventHandler = e => {
        e.preventDefault();
        const options = { onSuccess: () => onClose() };
        if (event) {
            put(`/events/${event.id}`, options);
        } else {
            post('/events', options);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">{event ? 'Edit Event' : 'Create Event'}</h2>
                <form onSubmit={submit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>
                        <div>
                            <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                                Start Time
                            </label>
                            <input
                                id="start_time"
                                type="datetime-local"
                                value={data.start_time}
                                onChange={e => setData('start_time', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.start_time && <p className="mt-1 text-sm text-red-600">{errors.start_time}</p>}
                        </div>
                        <div>
                            <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
                                End Time
                            </label>
                            <input
                                id="end_time"
                                type="datetime-local"
                                value={data.end_time}
                                onChange={e => setData('end_time', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.end_time && <p className="mt-1 text-sm text-red-600">{errors.end_time}</p>}
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                value={data.location}
                                onChange={e => setData('location', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Pagination({ links }: { links: PaginatedEvents['links'] }) {
    return (
        <div className="mt-6 flex flex-wrap">
            {links.map(link => (
                <Link
                    key={link.label}
                    href={link.url ?? ''}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`mr-1 mb-1 rounded border px-4 py-3 text-sm leading-4 hover:bg-white focus:border-indigo-500 focus:text-indigo-500 ${
                        link.active ? 'border-indigo-500 bg-white' : 'border-gray-300'
                    } ${!link.url ? 'cursor-not-allowed text-gray-400' : ''}`}
                />
            ))}
        </div>
    );
}

export default function EventPage() {
    const { events, filters, current, flash } = usePage<EventPageProps>().props;
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get('/events', { search }, { preserveState: true, replace: true });
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const openCreateModal = () => {
        setEditingEvent(null);
        setIsModalOpen(true);
    };

    const openEditModal = (event: Event) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
    };

    const deleteEvent = (event: Event) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            router.delete(`/events/${event.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Events" />
            <h1 className="mb-4 text-xl font-semibold">Welcome {current?.name}</h1>

            {flash?.success && (
                <div className="mb-4 rounded border border-green-400 bg-green-100 p-4 text-green-700">
                    {flash.success}
                </div>
            )}

            <div className="mb-4 flex items-center justify-between">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search events..."
                    className="w-1/3 rounded-md border-gray-300 shadow-sm"
                />
                <button
                    onClick={openCreateModal}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Create Event
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow sm:rounded-lg">
                <table className="w-full min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Start Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                End Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {events.data.map(event => (
                            <tr key={event.id}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                    {event.name}
                                </td>
                                <td className="break-words px-6 py-4 text-sm text-gray-500">{event.description}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {formatDate(event.start_time)}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {formatDate(event.end_time)}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{event.location}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                    <button
                                        onClick={() => openEditModal(event)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteEvent(event)}
                                        className="ml-4 text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {events.data.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No events found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination links={events.links} />

            <EventFormModal isOpen={isModalOpen} onClose={closeModal} event={editingEvent} />
        </AppLayout>
    );
}
