import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { usePostAssuranceAPI } from '@/apis/assuarance';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useQAStore } from '@/store';

import { schema } from './QASchema';
import { ssafyClass } from './class';

type Region = '' | 'seoul' | 'daejeon' | 'boowolgyung' | 'gwangju' | 'gumi';

export interface QASchema {
  classNumber: string;
  region: Region;
  name: string;
  content: string;
}

const QualityAssurancePage = () => {
  const postAssurance = usePostAssuranceAPI();
  const { isQA } = useQAStore();
  const form = useForm<QASchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      classNumber: '',
      region: '',
      name: '',
      content: '',
    },
  });

  const onsubmit = (data: QASchema) => {
    postAssurance(data);
    form.reset();
  };

  return (
    <div className='flex h-full items-center justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)}>
          <Card className='p-5'>
            <CardHeader>
              <CardTitle>Add Issue</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-6'>
              <div className='flex gap-4'>
                <FormField
                  control={form.control}
                  name='region'
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-[200px]'>
                            <SelectValue placeholder='지역' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>지역</SelectLabel>
                            <SelectItem value='seoul'>서울</SelectItem>
                            <SelectItem value='daejeon'>대전</SelectItem>
                            <SelectItem value='boowolgyung'>부울경</SelectItem>
                            <SelectItem value='gumi'>구미</SelectItem>
                            <SelectItem value='gwangju'>광주</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='classNumber'
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-[200px]'>
                            <SelectValue placeholder='반' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ssafyClass[form.watch('region')]}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='pl-1'>이름</FormLabel>
                    <FormControl>
                      <Input placeholder='이름을 입력하세요' {...field} />
                    </FormControl>
                    <FormMessage className='pl-1' />
                  </FormItem>
                )}
              />
              <div className='flex flex-col gap-3'>
                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>상세설명</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='요구사항을 남겨주세요'
                          className='h-[200px] resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type='submit' disabled={isQA}>
                제출하기
              </Button>
              {isQA && (
                <Label className='text-destructive'>
                  QA는 중복으로 요청할 수 없습니다.
                </Label>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default QualityAssurancePage;
