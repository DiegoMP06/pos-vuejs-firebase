import {generateClasses} from '@formkit/themes'

const config = {
    config: {
        classes: generateClasses({
            global: {
                label: 'block font-bold text-lg',
                message: 'bg-red-100 text-red-700 border-l-8 rounded py-2 pl-6 pr-2 border-red-700 text-sm font-black uppercase',
                wrapper: 'grid grid-cols-1 gap-1',
                outer: 'grid grid-cols-1 gap-2',
                inner: 'grid grid-cols-1 gap-1',
                form: 'grid grid-cols-1 gap-4',
                input: 'block w-full rounded px-3 py-2 border-gray-300 text-gray-700 placeholder-gray-400',
            },
            file: {
                noFiles: 'text-sm font-black p-2 block text-white bg-gray-700 rounded text-center',
                fileList: 'hidden',
            },
            submit: {
                input: 'bg-green-400 font-bold hover:bg-green-500 uppercase disabled:opacity-50 disabled:hover:bg-green-400'
            }
        }),
    }
}

export default config;