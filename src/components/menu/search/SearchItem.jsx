import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { useSelector } from "react-redux";
import { getCategoryName, getItemName } from "@/lib/itemLanguageHelpers";
import { BlurHashForCategories } from "@/components/Vedio_Image/BlurHash";
import { placeholderSearchItem } from "@/lib/utils";

export default function SearchItem({ selectItem }) {
    const { allMenus } = useSelector((state) => state.menu);
    const { language } = useSelector((state) => state.language);
    const allCategories = allMenus?.map((menu) => menu.Categories).flat();

    return (
        <Command className="rounded-lg shadow-md bg-inherit text-inherit">
            <CommandInput placeholder={placeholderSearchItem(language.language_code)} />
            <CommandList className="text-inherit max-h-full overflow-y-auto">
                <CommandEmpty>No results found.</CommandEmpty>
                {allCategories.map((category, i) => (
                    <CommandGroup key={i} className="text-inherit !text-lg" heading={getCategoryName(category, language.id)}>
                        {category.Items.map((item, j) => {
                            return (
                                <CommandItem
                                    key={j}
                                    className="bg-inherit text-inherit"
                                >
                                    <div
                                        onClick={() => selectItem(item)}
                                        className="w-full flex gap-3 items-center"
                                    >
                                        <BlurHashForCategories
                                            className="!h-16 !w-24"
                                            medium={item.image_medium}
                                            hash={item.blurhash}
                                            low={item.image_low}
                                            name={getItemName(item, language.id)}
                                        />
                                        <p className="text-lg">
                                            {getItemName(item, language.id)}
                                        </p>
                                    </div>
                                </CommandItem>
                            )
                        })}
                        <CommandSeparator />
                    </CommandGroup>
                ))}
            </CommandList>
        </Command>
    )
}
