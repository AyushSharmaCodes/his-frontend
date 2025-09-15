import { Calendar } from "../ui/Calendar";
import { usePopover } from "../ui/Popover";

const DatePickerWithClose: React.FC<{
  selected?: Date;
  onSelect: (date: Date) => void;
}> = ({ selected, onSelect }) => {
  const { close } = usePopover();

  const handleSelect = (date: Date) => {
    onSelect(date);
    close();
  };

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={handleSelect}
      required
      initialFocus
    />
  );
};

export default DatePickerWithClose;
