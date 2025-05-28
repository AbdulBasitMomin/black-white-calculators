
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface CurrencyComboboxProps {
  currencies: Currency[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function CurrencyCombobox({
  currencies,
  value,
  onValueChange,
  placeholder = "Select currency..."
}: CurrencyComboboxProps) {
  const [open, setOpen] = useState(false);

  const selectedCurrency = currencies.find((currency) => currency.code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between input-electric text-lg py-6 font-normal"
        >
          {selectedCurrency ? (
            <span className="flex items-center gap-2">
              <span className="font-semibold">{selectedCurrency.code}</span>
              <span className="text-gray-400">-</span>
              <span>{selectedCurrency.name}</span>
            </span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-gray-900 border-gray-700" align="start">
        <Command className="bg-gray-900 border-gray-700">
          <CommandInput 
            placeholder="Search currencies..." 
            className="bg-gray-900 text-white border-gray-700"
          />
          <CommandList className="max-h-60">
            <CommandEmpty className="text-gray-400 py-6 text-center">
              No currency found.
            </CommandEmpty>
            <CommandGroup>
              {currencies.map((currency) => (
                <CommandItem
                  key={currency.code}
                  value={`${currency.code} ${currency.name}`}
                  onSelect={() => {
                    onValueChange(currency.code);
                    setOpen(false);
                  }}
                  className="text-white hover:bg-gray-800 cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === currency.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{currency.code}</span>
                    <span className="text-gray-400">-</span>
                    <span>{currency.name}</span>
                    <span className="ml-auto text-gray-400">{currency.symbol}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
