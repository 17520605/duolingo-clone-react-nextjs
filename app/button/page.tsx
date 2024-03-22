import { Button } from '@/components/ui/button';
const ButtonPage = () => {
  return (
    <div className=' p-4 space-y-4 flex flex-col max-w-[300px] mb-5'>
      <Button variant={'primary'} size="lg">Button</Button>
      <Button variant={'primaryOutline'} size="lg">Button</Button>
      <Button variant={'secondary'} size="lg">Button</Button>
      <Button variant={'super'} size="lg">Button</Button>
      <Button variant={'ghost'} size="lg">Button</Button>
      <Button variant={'sidebar'} size="lg">Button</Button>
      <Button variant={'sidebarOutline'} size="lg">Button</Button>
      <Button variant={'danger'} size="lg">Button</Button>
      <Button variant={'dangerOutline'} size="lg">Button</Button>
      <Button variant={'default'} size="lg">Button</Button>
    </div>
  )
}

export default ButtonPage;