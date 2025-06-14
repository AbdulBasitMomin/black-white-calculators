
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
  flag: string;
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
          className="w-full justify-between glass-input text-gray-800 dark:text-white rounded-2xl p-6 text-lg font-normal transition-all duration-300"
        >
          {selectedCurrency ? (
            <span className="flex items-center gap-3">
              <span className="text-2xl">{selectedCurrency.flag}</span>
              <span className="font-semibold">{selectedCurrency.code}</span>
              <span className="text-gray-500 dark:text-white/60">-</span>
              <span className="text-gray-700 dark:text-white/90">{selectedCurrency.name}</span>
            </span>
          ) : (
            <span className="text-gray-500 dark:text-white/60">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 glass-card-light border border-gray-200/30 dark:border-white/20 rounded-2xl shadow-2xl" align="start">
        <Command className="glass-card-light border-0">
          <CommandInput 
            placeholder="Search currencies..." 
            className="glass-input text-gray-800 dark:text-white border border-gray-200/30 dark:border-white/20 rounded-xl m-2"
          />
          <CommandList className="max-h-60">
            <CommandEmpty className="text-gray-600 dark:text-white/70 py-6 text-center">
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
                  className="text-gray-800 dark:text-white hover:bg-gray-100/50 dark:hover:bg-white/20 cursor-pointer rounded-xl mx-2 my-1 transition-all duration-200"
                >
                  <Check
                    className={cn(
                      "mr-3 h-4 w-4",
                      value === currency.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xl">{currency.flag}</span>
                    <span className="font-semibold">{currency.code}</span>
                    <span className="text-gray-500 dark:text-white/60">-</span>
                    <span className="flex-1">{currency.name}</span>
                    <span className="text-gray-600 dark:text-white/70 text-sm">{currency.symbol}</span>
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
