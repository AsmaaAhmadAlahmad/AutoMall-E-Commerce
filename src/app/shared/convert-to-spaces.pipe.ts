import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
name : 'convertToSpaces',
standalone:true
})


export  class convertToSpacesPipe implements PipeTransform
{
  transform(value: any, ...args: any[]) {
return value.replaceAll(args[0],' ');
  }

}
