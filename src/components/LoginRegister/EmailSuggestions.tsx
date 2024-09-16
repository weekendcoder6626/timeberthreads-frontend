import { Menu, rem } from '@mantine/core';
import {
    IconAt,
} from '@tabler/icons-react';


const suggestions = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "microsoft.com"
]

export function EmailSuggestions({ children, appendSuggestion }: { children: any, appendSuggestion: (sug: string) => void }) {
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                {children}
            </Menu.Target>

            <Menu.Dropdown>
                {suggestions.map((sug, idx) => (
                    <Menu.Item onClick={() => appendSuggestion("@" + sug)} key={idx} leftSection={<IconAt style={{ width: rem(14), height: rem(14) }} />}>
                        {sug}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
}