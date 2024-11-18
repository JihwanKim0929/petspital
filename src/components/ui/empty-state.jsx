import { EmptyState as ChakraEmptyState, VStack } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const EmptyState = forwardRef(function EmptyState(props, ref) {
  const { title, description, icon, children, ...rest } = props
  return (
    <ChakraEmptyState.Root ref={ref} {...rest}>
      <ChakraEmptyState.Content>
        {icon && (
          <ChakraEmptyState.Indicator>{icon}</ChakraEmptyState.Indicator>
        )}
        {description ? (
          <VStack textAlign='center'>
            <ChakraEmptyState.Title fontFamily='LINESeedKR-Bd' fontSize={{base:'14px', md:'18px', lg:'20px'}}>{title}</ChakraEmptyState.Title>
            <ChakraEmptyState.Description fontFamily='Pretendard Variable' fontSize={{base:'12px', md:'15px', lg:'16px'}}>
              {description}
            </ChakraEmptyState.Description>
          </VStack>
        ) : (
          <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
        )}
        {children}
      </ChakraEmptyState.Content>
    </ChakraEmptyState.Root>
  )
})
